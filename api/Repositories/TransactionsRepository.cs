using System;
using api.Data;
using api.DTOs.Transaction;
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

        var page = query.Page - 1 < 0 ? 0 : query.Page - 1;
        transactions = transactions.Skip(page * query.Limit).Take(query.Limit);
        var result = await transactions.ToListAsync();

        return result;
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
