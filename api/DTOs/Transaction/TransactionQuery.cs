using System;
using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Transaction;

public class TransactionQuery : Query
{
    [MaxLength(10)]
    public string? Type { get; set; }
    public decimal MinValue { get; set; }
    public decimal MaxValue { get; set; }
}
