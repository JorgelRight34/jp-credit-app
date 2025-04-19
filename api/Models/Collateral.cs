using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using api.Enums;

namespace api.Models;

public class Collateral
{
    [Key]
    public int Id { get; set; }
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
    public string? OwnerId { get; set; }
    [Required]
    public int LoanId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateOnly? ExpirationDate { get; set; }
    public string? Location { get; set; }

    // Navigation Properties
    [ForeignKey("OwnerId")]
    public AppUser? Owner { get; set; }
    [ForeignKey("LoanId")]
    public Loan? Loan { get; set; }
    public List<Photo> Photos { get; set; } = [];
    public List<FileUpload> Files { get; set; } = [];
}
