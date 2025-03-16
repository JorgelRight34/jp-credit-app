using System;
using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Loan;

public class CreateLoanDto
{
    // Loan details
    [Required]
    public decimal Amount { get; set; }
    [Required]
    public decimal InterestRate { get; set; }
    public DateOnly StartDate { get; set; }
    public string Status { get; set; } = "Pending";

    // Relationships
    public int? LoanOfficerId { get; set; }
    [Required]
    public string? ClientId { get; set; }
    public int? CollateralId { get; set; }
}
