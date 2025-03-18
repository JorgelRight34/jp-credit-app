using System;
using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Loan;

public class UpdateLoanDto
{
    // Loan details
    [Required]
    public decimal ApprovedAmount { get; set; } // Monto aprobado
    [Required]
    public decimal DisbursedAmount { get; set; }    // Monto desembolsado
    public decimal AnnualInterestRate { get; set; }
    public int NumberOfPayments { get; set; }
    [Required]
    public decimal PaymentFrecuency { get; set; }

    // Details
    [Required]
    public DateOnly StartDate { get; set; }
    public DateOnly DeliveryDate { get; set; }  // Entrega
    public string? Status { get; set; }
}
