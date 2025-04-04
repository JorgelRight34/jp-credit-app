using System;
using api.Data;
using api.DTOs.Loan;
using api.DTOs.Transaction;
using api.Extensions;
using api.Interfaces;
using api.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class LoansRepository(ApplicationDbContext context, IMapper mapper) : ILoansRepository
{
    public async Task<LoanDto> CreateAsync(CreateLoanDto createLoanDto)
    {
        // Create loan
        var loan = mapper.Map<Loan>(createLoanDto);
        loan.PrincipalBalance = loan.DisbursedAmount;
        loan.AccruedInterest = 0;
        var days = (int)(createLoanDto.PaymentFrequency / 12) * 30;
        loan.NextPaymentDate = createLoanDto.StartDate.AddDays(days);
        loan.CalculatePaymentValue(loan.DisbursedAmount);

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
        var loans = context.Loans.AsQueryable();

        if (query.ClientId != null)
        {
            loans = loans.Where(x => x.ClientId == query.ClientId);
        }

        if (query.Username != null)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == query.Username);
            if (user != null)
            {
                loans = loans.Where(x => x.ClientId == user.Id);
            }
        }

        if (query.StartDate != null)
        {
            loans = loans.Where(x => x.CreatedAt >= query.StartDate);
        }

        if (query.EndDate != null)
        {
            loans = loans.Where(x => x.CreatedAt <= query.EndDate);
        }

        if (query.Status != null)
        {
            loans = loans.Where(x => x.Status == query.Status);
        }

        loans = loans.OrderBy(x => x.CreatedAt);

        return await loans.ProjectTo<LoanDto>(mapper.ConfigurationProvider).PaginateAsync(query);
    }

    public async Task<LoanDto?> GetByIdAsync(int id)
    {
        var loan = await context.Loans.Include(x => x.Client).FirstOrDefaultAsync(x => x.Id == id);
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
