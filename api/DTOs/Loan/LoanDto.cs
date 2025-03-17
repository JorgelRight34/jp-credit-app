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
    public string? Description { get; set; }
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
    public int PaymentValue { get; set; }
    public DateOnly StartDate { get; set; }
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
