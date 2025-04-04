using System;
using System.ComponentModel.DataAnnotations;
using api.DTOs.Validators;

namespace api.DTOs.Loan;

public class CreateLoanDto
{
    // Loan details
    [Required]
    public decimal ApprovedAmount { get; set; } // Monto aprobado
    [Required]
    public decimal DisbursedAmount { get; set; }    // Monto desembolsado
    public decimal AnnualInterestRate { get; set; }
    public int NumberOfPayments { get; set; }
    [Required]
    public decimal PaymentFrequency { get; set; }

    // Details
    [Required]
    public DateOnly StartDate { get; set; }
    public DateOnly DeliveryDate { get; set; }  // Entrega
    [LoanState]
    public string? Status { get; set; }
    // Relationships
    public string? LoanOfficerId { get; set; }
    [Required]
    public string? ClientId { get; set; }
}
