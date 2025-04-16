using System;
using System.ComponentModel.DataAnnotations;
using api.DTOs.Validators;
using api.Enums;

namespace api.DTOs.Collateral;

public class CreateCollateralDto
{
    [Required]
    public string? Title { get; set; }
    public string? Description { get; set; }
    [Required]
    public CollateralAgreementType AgreementType { get; set; }
    public decimal Value { get; set; }
    [Required]
    public CollateralCondition Condition { get; set; } = CollateralCondition.Stable;
    [Required]
    public CollateralStatus Status { get; set; } = CollateralStatus.Active;
    public string? DocumentUrl { get; set; }
    [Required]
    public string? ClientId { get; set; }
    
    public string? Location { get; set; }
    [Required]
    public int LoanId { get; set; }
    public DateOnly ExpirationDate { get; set; }
}
