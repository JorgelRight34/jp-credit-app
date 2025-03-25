using System;
using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Armotization;

public class GenerateArmotizationDto
{
    [Required]
    public decimal PrincipalBalance { get; set; }
    [Required]
    public decimal AnnualInterestRate { get; set; }
    [Required]
    public decimal PaymentFrequency { get; set; }
    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "Number of payments must be at least 1")]
    public int NumberOfPayments { get; set; }
}
