using System;
using System.ComponentModel.DataAnnotations;
using api.Enums;

namespace api.DTOs.Transaction;

public class TransactionQuery : Query
{
    public decimal MinValue { get; set; }
    public decimal MaxValue { get; set; }
    public string? Username { get; set; }
    public TransactionType? Type { get; set; }
    public int? LoanId { get; set; }
}
