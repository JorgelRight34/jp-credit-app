using System;
using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class Loan
{
    [Key]
    public int Id { get; set; }

    // Loan details
    [Required]
    public decimal Amount { get; set; }
    [Required]
    public decimal InterestRate { get; set; }
    public int TermMonths { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public string Status { get; set; } = "Pending";

    // Relationships
    public int? LoanOfficerId { get; set; }
    [Required]
    public string? AppUserId { get; set; }
    public int? CollateralId { get; set; }

    public LoanOfficer? LoanOfficer { get; set; }
    public AppUser? User { get; set; }
    public Collateral? Collateral { get; set; }

    // Audit fields
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
