using System;
using System.ComponentModel.DataAnnotations;
using api.DTOs.Collateral;
using api.DTOs.User;
using api.Models;

namespace api.DTOs.Loan;

public class LoanDto
{
    public int Id { get; set; }

    // Loan details
    [Required]
    public decimal ApprovedAmount { get; set; } // Monto aprobado
    public string? Description { get; set; }
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
    public decimal PaymentFrecuency { get; set; }

    // Details
    [Required]
    public decimal PaymentValue { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly NextPaymentDate { get; set; }
    public DateOnly LastPaymentDate { get; set; }
    public DateOnly DeliveryDate { get; set; }  // Entrega
    public string Status { get; set; } = "Pending";

    // Navigation properties
    public UserDto? Client { get; set; }
    public UserDto? LoanOfficer { get; set; }
    public CollateralDto? Collateral { get; set; }

    // Audit fields
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
