using System;
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
    IPhotoService photoService
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
        .Include(x => x.Loan)
        .FirstOrDefaultAsync(x => x.Id == id);
        if (collateral == null) return null;

        return collateral;
    }

    public async Task<Collateral?> UpdateAsync(UpdateCollateralDto updateCollateralDto, int id)
    {
        var collateral = await context.Collaterals.FindAsync(id);
        if (collateral == null) return null;

        mapper.Map(updateCollateralDto, collateral);

        await context.SaveChangesAsync();

        return collateral;
    }

    public async Task<Collateral> AddCollateralPhotoAsync(IFormFile file, Collateral collateral)
    {
        var result = await photoService.AddPhotoAsync(file);

        var photo = new Photo
        {
            Url = result.SecureUrl.AbsoluteUri,
            PublicId = result.PublicId
        };

        collateral.Photos.Add(photo);
        await context.SaveChangesAsync();

        return collateral;
    }

    public async Task DeleteCollateralPhotoAsync(string publicId)
    {
        var result = await photoService.DeletePhotoAsync(publicId);
        if (result.Result != "ok") throw new Exception(result.Result);
    }
}
