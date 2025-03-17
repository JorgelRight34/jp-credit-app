using System;
using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Transaction;

public class TransactionQuery
{
    [MaxLength(10)]
    public string? Type { get; set; }
    public decimal MinValue { get; set; }
    public decimal MaxValue { get; set; }
    public int Page { get; set; }
    public int Limit { get; set; } = 10;
}
