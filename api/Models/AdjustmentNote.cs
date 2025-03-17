using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using api.Models;

namespace api.Models;

public class AdjustmentNote
{
    [Key]
    public int Id { get; set; }
    public string? Description { get; set; }
    [Required]
    public decimal Amount { get; set; }
    [Required]
    public DateOnly Date { get; set; }
    [Required]
    public int LoanId { get; set; }
    [ForeignKey("LoanId")]
    public Loan? Loan { get; set; }
}
