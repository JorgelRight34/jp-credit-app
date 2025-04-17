using System;
using System.Text.Json;
using api.Data;
using api.DTOs.Collateral;
using api.Extensions;
using api.Interfaces;
using api.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class CollateralsRepository(
    ApplicationDbContext context,
    IMapper mapper,
    IFileUploadService fileUploadService
) : ICollateralsRepository
{
    public async Task<Collateral> CreateAsync(CreateCollateralDto createCollateralDto)
    {
        var collateral = mapper.Map<Collateral>(createCollateralDto);

        await context.Collaterals.AddAsync(collateral);
        await context.SaveChangesAsync();

        return collateral;
    }

    public async Task<Collateral?> DeleteAsync(int id)
    {
        var collateral = await context.Collaterals.FirstOrDefaultAsync(x => x.Id == id);
        if (collateral == null) return null;

        context.Collaterals.Remove(collateral);
        await context.SaveChangesAsync();

        return collateral;
    }

    public async Task<IEnumerable<Collateral>> GetAllAsync(CollateralQuery query)
    {
        var collaterals = context.Collaterals.AsQueryable();

        if (query.MinValue > 0)
        {
            if (query.MaxValue < query.MinValue) throw new Exception(
                "Min value can't be greater than max value"
            );
            collaterals = collaterals.Where(x => x.Value >= query.MinValue);
        }
        if (query.MaxValue > 0)
        {
            if (query.MaxValue < query.MinValue) throw new Exception(
                "Min value can't be greater than max value"
            );
            collaterals = collaterals.Where(x => x.Value <= query.MaxValue);
        }

        if (!String.IsNullOrEmpty(query.Title))
        {
            collaterals = collaterals.Where(
                x => x.Title != null && x.Title.ToLower().Contains(query.Title.ToLower())
            );
        }

        if (!String.IsNullOrEmpty(query.Description))
        {
            collaterals = collaterals.Where(
                x => x.Description != null && x.Description.ToLower().Contains(query.Description.ToLower())
            );
        }

        if (!String.IsNullOrEmpty(query.Username))
        {
            var clientId = await context.Users.Where(x => x.UserName == query.Username).Select(x => x.Id).FirstOrDefaultAsync();
            collaterals = collaterals.Where(x => x.AppUserId == clientId);
        }

        if (query.LoanId != null && query.LoanId != 0)
        {
            collaterals = collaterals.Where(x => x.LoanId == query.LoanId);
        }

        return await collaterals.PaginateAsync(query);
    }

    public async Task<Collateral?> GetByIdAsync(int id)
    {
        var collateral = await context.Collaterals
        .Include(x => x.AppUser)
        .ThenInclude(x => x!.Photo)
        .Include(x => x.Loan)
        .Include(x => x.Photos)
        .Include(x => x.Files)
        .FirstOrDefaultAsync(x => x.Id == id);
        if (collateral == null) return null;

        return collateral;
    }

    public async Task<Collateral?> UpdateAsync(UpdateCollateralDto updateCollateralDto, int id)
    {
        var collateral = await GetByIdAsync(id);
        if (collateral == null) return null;

        mapper.Map(updateCollateralDto, collateral);

        await context.SaveChangesAsync();
        return collateral;
    }

    public async Task<Collateral> AddCollateralPhotoAsync(IFormFile file, Collateral collateral)
    {
        var result = await fileUploadService.AddPhotoAsync(file);

        var photo = new Photo
        {
            Url = result.SecureUrl.AbsoluteUri,
            CollateralId = collateral.Id,
            PublicId = result.PublicId
        };

        collateral.Photos.Add(photo);
        await context.SaveChangesAsync();

        return collateral;
    }

    public async Task DeleteCollateralPhotoAsync(string publicId)
    {
        var photo = await context.Photos.Where(x => x.PublicId == publicId).FirstOrDefaultAsync();
        if (photo == null) throw new Exception("Photo not found");
    
        var result = await fileUploadService.DeletePhotoAsync(publicId);
        if (result.Result != "ok") throw new Exception(result.Result);

        context.Photos.Remove(photo);
        await context.SaveChangesAsync();
    }

    public async Task DeleteCollateralFileAsync(string publicId)
    {
        var file = await context.FileUploads.Where(x => x.PublicId == publicId).FirstOrDefaultAsync();
        if (file == null) throw new Exception("File not found");

        var result = await fileUploadService.DeleteFileAsync(publicId);
        if (result.Result != "ok") throw new Exception(result.Result);

        context.FileUploads.Remove(file);
        await context.SaveChangesAsync();
    }   

    public async Task<Collateral> AddCollateralFileAsync(IFormFile file, Collateral collateral)
    {
        var result = await fileUploadService.AddFileAsync(file);
        if (result.Error != null) throw new Exception(result.Error.Message);

        var fileUpload = new FileUpload
        {
            PublicId = result.PublicId,
            Url = result.Url.ToString(),
            CollateralId = collateral.Id,
            Name = result.PublicId,
            FileType = Path.GetExtension(result.PublicId).Replace(".", "")
        };

        await context.FileUploads.AddAsync(fileUpload);
        await context.SaveChangesAsync();

        return collateral;
    }
}
