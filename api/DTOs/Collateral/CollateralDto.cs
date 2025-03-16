using System;
using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Collateral;

public class CollateralDto
{
    public int? Id { get; set; }
    [Required]
    public string? Title { get; set; }
    public string? Description { get; set; }
    [Required]
    public string? AgreementType { get; set; }
    public decimal Value { get; set; }
    [Required]
    public string? Condition { get; set; }
    [Required]
    public string? State { get; set; }
    public string? DocumentUrl { get; set; }
    [Required]
    public string? ClientId { get; set; }

}
