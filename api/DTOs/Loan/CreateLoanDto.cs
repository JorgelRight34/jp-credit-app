using System;
using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Loan;

public class CreateLoanDto
{
    // Loan details
    [Required]
    public decimal Amount { get; set; } // Monto aprobado
    [Required]
    public decimal DisbursedAmount { get; set; }    // Monto desembolsado
    [Required]
    public decimal AnnualInterestRate { get; set; }
    public int NumberOfPayments { get; set; }
    public int PaymentFrecuency { get; set; }

    // Details
    [Required]
    public DateOnly StartDate { get; set; }
    public DateOnly DeliveryDate { get; set; }  // Entrega
    public string Status { get; set; } = "Pending";

    // Relationships
    public int? LoanOfficerId { get; set; }
    [Required]
    public string? AppUserId { get; set; }
    public int? CollateralId { get; set; }
}
