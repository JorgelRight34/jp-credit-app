using System;
using api.DTOs.Transaction;

namespace api.Interfaces;

public interface ITransactionsRepository
{
    public Task<TransactionDto> CreateAsync(CreateTransactionDto createTransactionDto);
    public Task<IEnumerable<TransactionDto>> GetAllAsync(TransactionQuery query);
    public Task<TransactionDto?> GetByIdAsync(int id);
    public Task<TransactionDto?> UpdateAsync(UpdateTransactionDto updateTransactionDto, int id);
    public Task<TransactionDto?> DeleteAsync(int id);
}
