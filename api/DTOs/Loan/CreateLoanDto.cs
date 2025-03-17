using System;
using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Loan;

public class CreateLoanDto
{
    // Loan details
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
    public DateOnly StartDate { get; set; }
    public DateOnly DeliveryDate { get; set; }  // Entrega
    public string Status { get; set; } = "Pending";

    // Relationships
    public string? LoanOfficerId { get; set; }
    [Required]
    public string? ClientId { get; set; }
    public int? CollateralId { get; set; }
}
