using System;
using System.ComponentModel.DataAnnotations;
using api.DTOs.Loan;
using api.DTOs.User;
using api.Enums;
using api.Models;

namespace api.DTOs.Transaction;

public class TransactionDto
{
    [Required]
    public int Id { get; set; }
    [Required]
    public decimal CapitalValue { get; set; }
    [Required]
    public TransactionType? Type { get; set;}
    [Required]
    public decimal InterestValue { get; set; }
    public decimal Delinquency { get; set; }
     public decimal PenaltyFee { get; set; }
    [Required]
    public int LoanId { get; set; }
    [Required]
    public string? PayerId { get; set; }
    [Required]
    public DateOnly? Date { get; set; }
    public UserDto? Payer { get; set; }
    public LoanDto? Loan { get; set; }
}
