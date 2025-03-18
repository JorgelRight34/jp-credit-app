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

public class TransactionsRepository(
    ApplicationDbContext context,
    IAdjustmentNotesRepository adjustmentNotesRepository,
    IMapper mapper
) : ITransactionsRepository
{
    public async Task<TransactionDto> CreateAsync(CreateTransactionDto createTransactionDto)
    {
        var transaction = mapper.Map<Transaction>(createTransactionDto);

        // Calculate capital value and interest value
        var loan = await context.Loans.FindAsync(createTransactionDto.LoanId);
        if (loan == null) throw new Exception("Loan doesn't exist");

        // Get monthly interest 
        var monthlyInterest = loan.AnnualInterestRate / loan.PaymentFrecuency;
        // Get interests I = balance * monthly interst
        var interests = loan.PrincipalBalance * monthlyInterest;
        // Get capital, capital = P - I
        var capital = createTransactionDto.Value - interests;

        // Update entities
        loan.AccruedInterest += interests;
        loan.PrincipalBalance -= capital;
        transaction.InterestValue = interests;
        transaction.CapitalValue = capital;

        // Calculate the new payment value (A)
        var previousPaymentValue = loan.PaymentValue;
        loan.NumberOfPayments -= 1;
        loan.CalculatePaymentValue();

        // Generate credit note if neccesary
        decimal tolerance = 0.5M;
        if (createTransactionDto.Value - loan.PaymentValue > tolerance)
        {
            var noteDto = new CreateAdjustmentNoteDto
            {
                Description = "Description",
                Amount = previousPaymentValue,
                Date = DateOnly.FromDateTime(DateTime.UtcNow),
                LoanId = loan.Id
            };
            await adjustmentNotesRepository.CreateAsync(noteDto);
        }

        await context.Transactions.AddAsync(transaction);
        await context.SaveChangesAsync();

        return mapper.Map<TransactionDto>(transaction);
    }

    public async Task<TransactionDto?> DeleteAsync(int id)
    {
        var transaction = await context.Transactions.FindAsync(id);
        if (transaction == null) return null;

        context.Transactions.Remove(transaction);
        await context.SaveChangesAsync();

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
        var transaction = await context.Transactions
        .Include(x => x.Payer)
        .FirstOrDefaultAsync(x => x.Id == id);

        return mapper.Map<TransactionDto>(transaction);
    }

    public async Task<TransactionDto?> UpdateAsync(UpdateTransactionDto updateTransactionDto, int id)
    {
        var transaction = await context.Transactions
        .Include(x => x.Payer)
        .FirstOrDefaultAsync(x => x.Id == id);

        if (transaction == null) return null;

        mapper.Map(updateTransactionDto, transaction);

        await context.SaveChangesAsync();

        return mapper.Map<TransactionDto>(transaction);
    }
}
