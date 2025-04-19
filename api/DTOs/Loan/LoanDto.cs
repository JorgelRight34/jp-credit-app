using System;
using System.ComponentModel.DataAnnotations;
using api.DTOs.Collateral;
using api.DTOs.Transaction;
using api.DTOs.User;
using api.DTOs.Validators;
using api.Enums;
using api.Models;

namespace api.DTOs.Loan;

public class LoanDto
{
    public int Id { get; set; }
    public string? ClientId { get; set; }
    public string? GuarantorId { get; set; }
    public int LastPaymentId { get; set; }

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
    public decimal PaymentFrequency { get; set; }

    // Details
    [Required]
    public decimal PaymentValue { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly NextPaymentDate { get; set; }
    public DateOnly? LastPaymentDate { get; set; }
    public DateOnly DeliveryDate { get; set; }  // Entrega
    [Required]
    [LoanState]
    public LoanStatus Status { get; set; }

    // Navigation properties
    public UserDto? Client { get; set; }
    public UserDto? LoanOfficer { get; set; }
    public UserDto? Guarantor { get; set; }
    public List<CollateralDto>? Collateral { get; set; }
    public List<TransactionDto>? Transactions { get; set; }
    public TransactionDto? LastPayment { get; set; }

    // Audit fields
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
