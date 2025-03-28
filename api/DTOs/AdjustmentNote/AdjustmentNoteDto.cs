using System;
using System.ComponentModel.DataAnnotations;
using api.DTOs.Loan;

namespace api.DTOs.AdjustmentNote;

public class AdjustmentNoteDto
{
    public int Id { get; set; }
    public string? Description { get; set; }
    [Required]
    public decimal Amount { get; set; }
    [Required]
    public DateOnly Date { get; set; }
    [Required]
    public int LoanId { get; set; }
    public LoanDto? Loan { get; set; }
}
