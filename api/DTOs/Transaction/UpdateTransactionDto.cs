using System;
using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Transaction;

public class UpdateTransactionDto
{
    [Required]
    [MaxLength(10)]
    public string? Type { get; set; }
    [Required]
    public decimal CapitalValue { get; set; }
    [Required]
    public decimal InterestValue { get; set; }
    [Required]
    public int LoanId { get; set; }
    [Required]
    public DateOnly? Date { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);
}
