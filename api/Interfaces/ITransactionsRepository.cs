using System;
using api.DTOs.Transaction;
using api.DTOS.Transaction;
using api.Models;

namespace api.Interfaces;

public interface ITransactionsRepository
{
    Task<Transaction> CreateAsync(CreateTransactionDto createTransactionDto);
    Task<Transaction?> DeleteAsync(int id);
    Task<IEnumerable<Transaction>> GetAllAsync(TransactionQuery query);
    Task<Transaction?> GetByIdAsync(int id);
    Task<TransactionStatsDto?> GetTransactionStats(int id);
    Task<IEnumerable<Transaction>> GetLoanTransactions(int loanId);
    Task<IEnumerable<Transaction>> GetUserTransactions(string userId);

}
