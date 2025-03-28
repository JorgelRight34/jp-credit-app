using System;
using System.ComponentModel.DataAnnotations;
using api.DTOs.Validators;

namespace api.DTOs.Collateral;

public class UpdateCollateralDto
{
    [Required]
    public string? Title { get; set; }
    public string? Description { get; set; }
    [Required]
    public string? AgreementType { get; set; }
    public decimal Value { get; set; }
    [Required]
    [CollateralCondition]
    public string? Condition { get; set; }
    [Required]
    [CollateralState]
    public string? State { get; set; }
    public string? DocumentUrl { get; set; }
}
