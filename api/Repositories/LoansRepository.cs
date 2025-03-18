using System;
using api.Data;
using api.DTOs.Loan;
using api.Extensions;
using api.Interfaces;
using api.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace api.Repositories;

public class LoansRepository(ApplicationDbContext context, IMapper mapper) : ILoansRepository
{
    public async Task<LoanDto> CreateAsync(CreateLoanDto createLoanDto)
    {
        var loan = mapper.Map<Loan>(createLoanDto);
        loan.PrincipalBalance = loan.DisbursedAmount;
        loan.AccruedInterest = 0;
        loan.CalculatePaymentValue();

        await context.Loans.AddAsync(loan);
        await context.SaveChangesAsync();

        return mapper.Map<LoanDto>(loan);
    }

    public async Task<LoanDto?> DeleteAsync(int id)
    {
        var loan = await context.Loans.FindAsync(id);
        if (loan == null) return null;

        context.Loans.Remove(loan);
        await context.SaveChangesAsync();

        return mapper.Map<LoanDto>(loan);
    }

    public async Task<IEnumerable<LoanDto>> GetAllAsync(LoanQuery query)
    {
        var loans = context.Loans.ProjectTo<LoanDto>(mapper.ConfigurationProvider).AsQueryable();

        return await loans.PaginateAsync(query);
    }

    public async Task<LoanDto?> GetByIdAsync(int id)
    {
        var loan = await context.Loans.FindAsync(id);
        if (loan == null) return null;

        return mapper.Map<LoanDto>(loan);
    }

    public async Task<LoanDto?> UpdateAsync(UpdateLoanDto updateLoanDto, int id)
    {
        var loan = await context.Loans.FindAsync(id);
        if (loan == null) return null;

        mapper.Map(updateLoanDto, loan);
        await context.SaveChangesAsync();

        return mapper.Map<LoanDto>(loan);
    }
}
