using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using api.DTOs.Validators;
using api.Enums;

namespace api.Models;

public class Transaction
{
    [Key]
    public int Id { get; set; }
    [Required]
    [MaxLength(10)]
    public required TransactionType Type { get; set; }
    [Required]
    public decimal CapitalValue { get; set; }
    [Required]
    public decimal InterestValue { get; set; }
    public decimal Delinquency { get; set; }
    public decimal PenaltyFee { get; set; }
    [Required]
    public int LoanId { get; set; }
    [Required]
    public string? PayerId { get; set; }
    [Required]
    public DateOnly Date { get; set; }
    [ForeignKey("LoanId")]
    public Loan? Loan { get; set; }
    [ForeignKey("PayerId")]
    public AppUser? Payer { get; set; }
}
