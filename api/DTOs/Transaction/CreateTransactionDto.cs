using System;
using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Transaction;

public class CreateTransactionDto
{
    [Required]
    public decimal Value { get; set; }
    [Required]
    public decimal PenaltyRate { get; set; } = 0.05M;
    [Required]
    public int MaxiumDelayDays { get; set; } = 5;
    [Required]
    public int LoanId { get; set; }
    [Required]
    public string? PayerId { get; set; }
    [Required]
    public DateOnly? Date { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);
}
