using System;
using api.Data;
using api.DTOs.Collateral;
using api.Interfaces;
using api.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class CollateralsRepository(ApplicationDbContext context, IMapper mapper) : ICollateralsRepository
{
    public async Task<CollateralDto> CreateAsync(CreateCollateralDto createCollateralDto)
    {
        var collateral = mapper.Map<Collateral>(createCollateralDto);

        await context.Collaterals.AddAsync(collateral);
        await context.SaveChangesAsync();

        var collateralDto = mapper.Map<CollateralDto>(collateral);

        return collateralDto;
    }

    public async Task<CollateralDto?> DeleteAsync(int id)
    {
        var collateral = await context.Collaterals.FindAsync(id);
        if (collateral == null) return null;

        context.Collaterals.Remove(collateral);
        await context.SaveChangesAsync();

        return mapper.Map<CollateralDto>(collateral);
    }

    public async Task<IEnumerable<CollateralDto>> GetAllAsync(CollateralQuery query)
    {
        var collaterals = context.Collaterals.ProjectTo<CollateralDto>(mapper.ConfigurationProvider).AsQueryable();

        if (!String.IsNullOrEmpty(query.Title))
        {
            collaterals = collaterals.Where(x => x.Title != null && x.Title.ToLower().Contains(query.Title.ToLower()));
        }

        if (!String.IsNullOrEmpty(query.Description))
        {
            collaterals = collaterals.Where(x => x.Description != null && x.Description.ToLower().Contains(query.Description.ToLower()));
        }

        var page = query.Page - 1 < 0 ? 0 : query.Page - 1;
        collaterals = collaterals.Skip(page * query.Limit).Take(query.Limit);
        var result = await collaterals.ToListAsync();

        return result;
    }

    public async Task<CollateralDto?> GetByIdAsync(int id)
    {
        var collateral = await context.Collaterals.FindAsync(id);
        if (collateral == null) return null;

        return mapper.Map<CollateralDto>(collateral);
    }

    public async Task<CollateralDto?> UpdateAsync(UpdateCollateralDto updateCollateralDto, int id)
    {
        var collateral = await context.Collaterals.FindAsync(id);
        if (collateral == null) return null;

        collateral.AgreementType = updateCollateralDto.AgreementType;
        collateral.Title = updateCollateralDto.Title;
        collateral.Description = updateCollateralDto.Description;
        collateral.Condition = updateCollateralDto.Condition;
        collateral.DocumentUrl = updateCollateralDto.DocumentUrl;

        await context.SaveChangesAsync();

        return mapper.Map<CollateralDto>(collateral);
    }
}
