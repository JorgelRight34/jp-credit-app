using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

public class Loan
{
    [Key]
    public int Id { get; set; }

    // Loan details
    public string? Description { get; set; }
    [Required]
    public decimal ApprovedAmount { get; set; } // Monto aprobado
    [Required]
    public decimal DisbursedAmount { get; set; }    // Monto desembolsado
    [Required]
    public decimal AnnualInterestRate { get; set; }
    public int NumberOfPayments { get; set; }
    [Required]
    public string? PaymentFrecuency { get; set; }

    // Details
    [Required]
    public decimal PaymentValue { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly DeliveryDate { get; set; }  // Entrega
    public string Status { get; set; } = "Pending";

    // Relationships
    [Required]
    public string? ClientId { get; set; }
    public string? LoanOfficerId { get; set; }
    public int? CollateralId { get; set; }

    // Navigation properties
    [ForeignKey("ClientId")]
    public AppUser? Client { get; set; }
    [ForeignKey("LoanOfficerId")]
    public AppUser? LoanOfficer { get; set; }
    public Collateral? Collateral { get; set; }

    // Audit fields
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
