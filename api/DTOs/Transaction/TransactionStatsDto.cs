using System;
using api.DTOs.Transaction;

namespace api.DTOS.Transaction;

public class TransactionStatsDto
{
    public TransactionDto? LastTransaction { get; set; }
    public TransactionDto? NextTransaction { get; set; }
    public DateOnly? NextTransactionDate { get; set; }
}
