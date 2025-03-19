using System;
using api.DTOs.Transaction;

namespace api.Interfaces;

public interface ITransactionsRepository
{
    Task<TransactionDto> CreateAsync(CreateTransactionDto createTransactionDto);
    Task<TransactionDto?> DeleteAsync(int id);
    Task<IEnumerable<TransactionDto>> GetAllAsync(TransactionQuery query);
    Task<TransactionDto?> GetByIdAsync(int id);
    Task<IEnumerable<TransactionDto>> GetLoanTransactions(int loanId);
    Task<IEnumerable<TransactionDto>> GetUserTransactions(string userId);

}
