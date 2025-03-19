using System;
using api.Data;
using api.DTOs.AdjustmentNote;
using api.DTOs.Transaction;
using api.Extensions;
using api.Interfaces;
using api.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class TransactionsRepository(ApplicationDbContext context, IMapper mapper) : ITransactionsRepository
{
    public async Task<TransactionDto> CreateAsync(CreateTransactionDto createTransactionDto)
    {
        var transaction = mapper.Map<Transaction>(createTransactionDto);

        // Calculate capital value and interest value
        var loan = await context.Loans.FindAsync(createTransactionDto.LoanId);
        if (loan == null) throw new Exception("Loan doesn't exist");

        // Get payment dates
        var payday = loan.NextPaymentDate;
        var principalBalance = loan.PrincipalBalance;

        // Check if transaction is 5 days late from the payday
        if (transaction.Date >= payday.AddDays(createTransactionDto.MaxiumDelayDays))
        {
            principalBalance = principalBalance + principalBalance * createTransactionDto.PenaltyRate;
        }

        // Get monthly interest 
        var monthlyInterest = loan.AnnualInterestRate / loan.PaymentFrecuency;
        // Get interests I = balance * monthly interst
        var interests = principalBalance * monthlyInterest;
        // Get capital, capital = P - I
        var capital = createTransactionDto.Value - interests;

        // Update entities
        loan.AccruedInterest += interests;
        loan.PrincipalBalance -= capital;
        transaction.InterestValue = interests;
        transaction.CapitalValue = capital;

        // Update next payment date
        var days = (int)(loan.PaymentFrecuency / 12) * 30;
        loan.NextPaymentDate = loan.NextPaymentDate.AddDays(days);

        // Calculate the new payment value (A)
        loan.NumberOfPayments -= 1;
        loan.CalculatePaymentValue(loan.PrincipalBalance);

        await context.Transactions.AddAsync(transaction);
        await SaveChanges();

        return mapper.Map<TransactionDto>(transaction);
    }

    public async Task<TransactionDto?> DeleteAsync(int id)
    {
        // Get transaction
        var transaction = await context.Transactions.FindAsync(id);
        if (transaction == null) return null;

        // Get loan
        var loan = await context.Loans.FindAsync(transaction.LoanId);
        if (loan == null) throw new Exception("Invalid loanId for transaction");

        // Update loan accrued interest and principal balance
        loan.AccruedInterest -= transaction.InterestValue;
        loan.PrincipalBalance += transaction.CapitalValue;
        // Update next payment date
        var days = (int)(loan.PaymentFrecuency / 12) * 30;
        loan.NextPaymentDate = loan.NextPaymentDate.AddDays(-days);

        loan.NumberOfPayments += 1;
        loan.CalculatePaymentValue(loan.PrincipalBalance);

        // Remove transaction
        context.Transactions.Remove(transaction);
        await SaveChanges();

        return mapper.Map<TransactionDto>(transaction);
    }

    public async Task<IEnumerable<TransactionDto>> GetAllAsync(TransactionQuery query)
    {
        var transactions = context.Transactions
        .ProjectTo<TransactionDto>(mapper.ConfigurationProvider)
        .AsQueryable();

        if (query.MinValue > 0)
        {
            if (query.MaxValue < query.MinValue) throw new Exception("Min value can't be greater than max value");
            transactions = transactions.Where(
                x => (x.CapitalValue + x.InterestValue) > query.MinValue
            );
        }

        if (query.MaxValue > 0)
        {
            if (query.MaxValue < query.MinValue) throw new Exception("Min value can't be greater than max value");
            transactions = transactions.Where(
                x => (x.CapitalValue + x.InterestValue) > query.MinValue
            );
        }

        return await transactions.PaginateAsync(query);
    }

    public async Task<TransactionDto?> GetByIdAsync(int id)
    {
        var transaction = await context.Transactions.FindAsync(id);

        return mapper.Map<TransactionDto>(transaction);
    }

    public async Task SaveChanges()
    {
        try
        {
            await context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            throw new Exception("Another transaction was being made at the same time for this loan, try again.");
        }
    }
}
