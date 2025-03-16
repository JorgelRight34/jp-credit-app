using System;
using api.Data;
using api.DTOs.LoanOfficer;
using api.Interfaces;
using api.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class LoanOfficersRepository(ApplicationDbContext context, IMapper mapper) : ILoanOfficersRepository
{
    public async Task<LoanOfficerDto> CreateAsync(CreateLoanOfficerDto createLoanOfficerDto)
    {
        var loanOfficer = mapper.Map<LoanOfficer>(createLoanOfficerDto);

        await context.LoanOfficers.AddAsync(loanOfficer);
        await context.SaveChangesAsync();

        return mapper.Map<LoanOfficerDto>(loanOfficer);
    }

    public async Task<LoanOfficerDto?> DeleteAsync(int id)
    {
        var loanOfficer = await context.LoanOfficers.FindAsync(id);
        if (loanOfficer == null) return null;

        context.LoanOfficers.Remove(loanOfficer);
        await context.SaveChangesAsync();

        return mapper.Map<LoanOfficerDto>(loanOfficer);
    }

    public async Task<IEnumerable<LoanOfficerDto>> GetAllAsync(LoanOfficerQuery query)
    {
        var loanOfficers = context.LoanOfficers
            .ProjectTo<LoanOfficerDto>(mapper.ConfigurationProvider)
            .AsQueryable();

        if (!String.IsNullOrEmpty(query.Neighborhood))
        {
            loanOfficers = loanOfficers.Where(
                x => x.Neighborhood != null && x.Neighborhood.ToLower().Contains(query.Neighborhood)
            );
        }

        var page = query.Page - 1 < 0 ? 0 : query.Page;
        loanOfficers = loanOfficers.Skip(page * query.Limit).Take(query.Limit);
        var result = await loanOfficers.ToListAsync();

        return result;
    }

    public async Task<LoanOfficerDto?> GetByIdAsync(int id)
    {
        var loanOfficer = await context.LoanOfficers.FindAsync(id);
        if (loanOfficer == null) return null;

        return mapper.Map<LoanOfficerDto>(loanOfficer);
    }

    public async Task<LoanOfficerDto?> UpdateAsync(UpdateLoanOfficerDto updateLoanOfficerDto, int id)
    {
        var loanOfficer = await context.LoanOfficers.FindAsync(id);
        if (loanOfficer == null) return null;

        loanOfficer.Neighborhood = updateLoanOfficerDto.Neighborhood;
        await context.SaveChangesAsync();

        return mapper.Map<LoanOfficerDto>(loanOfficer);
    }
}
