using System;
using api.Data;
using api.DTOs.Transaction;
using api.DTOS.Transaction;
using api.Enums;
using api.Extensions;
using api.Interfaces;
using api.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class TransactionsRepository(ApplicationDbContext context, IMapper mapper) : ITransactionsRepository
{
    public async Task<Transaction> CreateAsync(CreateTransactionDto createTransactionDto)
    {
        var transaction = mapper.Map<Transaction>(createTransactionDto);

        // Calculate capital value and interest value
        var loan = await context.Loans.FindAsync(createTransactionDto.LoanId);
        if (loan == null) throw new Exception("Loan doesn't exist");

        // Get payment dates
        var payday = loan.NextPaymentDate;
        var principalBalance = loan.PrincipalBalance;

        // Check if transaction is late
        if (transaction.Date > payday.AddDays(createTransactionDto.MaxiumDelayDays))
        {
            // Add penalty to principal balance
            var penaltyFee = principalBalance * createTransactionDto.PenaltyRate;
            principalBalance = principalBalance + penaltyFee;
            transaction.PenaltyFee = penaltyFee;
        }

        /*
        // Check if payment is less than what has to be paid
        if (createTransactionDto.Value < loan.PaymentValue)
        {
            // If payment doesn't cover the whole (A) then record it as delinquency (atraso)
            transaction.Delinquency = loan.PaymentValue - createTransactionDto.Value;
        }
        */

        // Get periodly interest 
        var periodlyInterest = loan.AnnualInterestRate / loan.PaymentFrequency;
        // Get interests I = balance * periodly interest
        var interests = principalBalance * periodlyInterest;
        // Get capital, capital = P - I
        var capital = createTransactionDto.Value - interests;

        // Update entities
        loan.AccruedInterest += interests;
        loan.PrincipalBalance -= capital;
        transaction.InterestValue = interests;
        transaction.CapitalValue = capital;
        if (loan.PrincipalBalance == 0) loan.Status = LoanStatus.PaidOff;   // If loan is completed then set to paid off

        // Update next payment date
        var days = (int)(loan.PaymentFrequency / 12) * 30;
        loan.NextPaymentDate = loan.NextPaymentDate.AddDays(days);

        // Calculate the new payment value (A)
        loan.NumberOfPayments -= 1;
        loan.CalculatePaymentValue(loan.PrincipalBalance);

        await context.Transactions.AddAsync(transaction);
        await SaveChanges();

        loan.LastPaymentId = transaction.Id;
        await context.SaveChangesAsync();

        return transaction;
    }

    public async Task<Transaction?> DeleteAsync(int id)
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
        var days = (int)(loan.PaymentFrequency / 12) * 30;
        loan.NextPaymentDate = loan.NextPaymentDate.AddDays(-days);

        loan.NumberOfPayments += 1;
        loan.CalculatePaymentValue(loan.PrincipalBalance);

        // Get payment before this
        var newLastPayment = context.Transactions
            .OrderByDescending(x => x.Date)
            .FirstOrDefaultAsync(x => x.Date <= transaction.Date);
        loan.LastPaymentId = newLastPayment.Id;

        // Remove transaction
        context.Transactions.Remove(transaction);
        await SaveChanges();

        return transaction;
    }

    public async Task<IEnumerable<Transaction>> GetAllAsync(TransactionQuery query)
    {
        var transactions = context.Transactions
            .Include(x => x.Payer)
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

        if (query.LoanId != null && query.LoanId != 0)
        {
            transactions = transactions.Where(x => x.LoanId == query.LoanId);
        }

        if (!String.IsNullOrEmpty(query.Username))
        {
            var clientId = await context.Users.Where(x => x.UserName == query.Username).Select(x => x.Id).FirstOrDefaultAsync();
            transactions = transactions.Where(x => x.PayerId == clientId);
        }


        return await transactions.PaginateAsync(query);
    }

    public async Task<Transaction?> GetByIdAsync(int id)
    {
        var transaction = await context.Transactions
            .Include(x => x.Loan)
                .ThenInclude(x => x!.Transactions)
            .Include(x => x.Payer)
                .ThenInclude(x => x!.Photo)
            .FirstOrDefaultAsync(x => x.Id == id);
        return transaction;
    }

    public async Task<IEnumerable<Transaction>> GetLoanTransactions(int loanId)
    {
        var transactions = await context.Transactions
            .Where(x => x.LoanId == loanId)
            .ToListAsync();

        return transactions;
    }

    public async Task<TransactionStatsDto?> GetTransactionStats(int id)
    {
        var transaction = await context.Transactions.FindAsync(id);
        if (transaction == null) return null;

        var lastTransaction = await context.Transactions
            .Where(x => x.Date < transaction.Date)
            .OrderByDescending(x => x.Date)
            .FirstOrDefaultAsync();

        var nextTransaction = await context.Transactions
            .Where(x => x.Date >= transaction.Date)
            .OrderBy(x => x.Date)
            .FirstOrDefaultAsync();

        return new TransactionStatsDto
        {
            LastTransaction = mapper.Map<TransactionDto>(lastTransaction),
            NextTransaction = mapper.Map<TransactionDto>(nextTransaction)
        };
    }

    public async Task<IEnumerable<Transaction>> GetUserTransactions(string userId)
    {
        var transactions = await context.Transactions
            .Where(x => x.PayerId == userId)
            .ToListAsync();

        return transactions;
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
