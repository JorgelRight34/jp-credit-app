using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using api.DTOs.Validators;
using api.Enums;

namespace api.Models;

public class Loan
{
    [Key]
    public int Id { get; set; }
    public int? LastPaymentId { get; set; }

    // Loan details
    public string? Description { get; set; }
    [Required]
    public decimal ApprovedAmount { get; set; } // Monto aprobado
    [Required]
    public decimal DisbursedAmount { get; set; }    // Monto desembolsado
    [Required]
    public decimal PrincipalBalance { get; set; }
    [Required]
    public decimal AccruedInterest { get; set; }
    [Required]
    public decimal AnnualInterestRate { get; set; }
    public int NumberOfPayments { get; set; }
    [Required]
    public decimal PaymentFrequency { get; set; }   // Times on a year it repeats, e.g a month = 1, semester = 6

    // Details
    [Required]
    public decimal PaymentValue { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly? LastPaymentDate { get; set; }
    public DateOnly NextPaymentDate { get; set; }
    public DateOnly DeliveryDate { get; set; }  // Entrega
    [Required]
    [LoanState]
    public LoanStatus Status { get; set; } = LoanStatus.Active;

    // Relationships
    [Required]
    public string? ClientId { get; set; }
    public string? LoanOfficerId { get; set; }
    public string? GuarantorId { get; set; }

    // Navigation properties
    [ForeignKey("ClientId")]
    public AppUser? Client { get; set; }
    [ForeignKey("LoanOfficerId")]
    public AppUser? LoanOfficer { get; set; }
    [ForeignKey("GuarantorId")]
    public AppUser? Guarantor { get; set; }
    public List<Collateral>? Collaterals { get; set; }
    [ForeignKey("LastPaymentId")]
    public virtual Transaction? LastPayment { get; set; }

    // Audit fields
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    [ConcurrencyCheck]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public List<Transaction> Transactions { get; set; } = new List<Transaction>();
}
