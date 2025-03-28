using System;
using System.ComponentModel.DataAnnotations;
using api.DTOs.Loan;
using api.DTOs.User;
using api.DTOs.Validators;
using api.Models;

namespace api.DTOs.Collateral;

public class CollateralDto
{
    public int? Id { get; set; }
    [Required]
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? AgreementType { get; set; }
    public decimal Value { get; set; }
    [Required]
    [CollateralCondition]
    public string? Condition { get; set; }
    [Required]
    [CollateralState]
    public string? State { get; set; }
    public string? DocumentUrl { get; set; }
    [Required]
    public string? ClientId { get; set; }
    [Required]
    public int LoanId { get; set; }

    public List<PhotoDto> Photos { get; set; } = [];
    public UserDto? Client { get; set; }
    public LoanDto? Loan { get; set; }
}
