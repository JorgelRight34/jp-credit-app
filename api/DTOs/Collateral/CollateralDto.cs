using System;
using System.ComponentModel.DataAnnotations;
using api.DTOs.FileUpload;
using api.DTOs.Loan;
using api.DTOs.User;
using api.DTOs.Validators;
using api.Enums;
using api.Models;

namespace api.DTOs.Collateral;

public class CollateralDto
{
    public int? Id { get; set; }
    [Required]
    public string? Title { get; set; }
    public string? Description { get; set; }
    public CollateralAgreementType AgreementType { get; set; }
    public decimal Value { get; set; }
    [Required]
    public CollateralCondition? Condition { get; set; }
    [Required]
    public CollateralStatus? Status { get; set; }
    public string? DocumentUrl { get; set; }
    [Required]
    public string? OwnerId { get; set; }
    [Required]
    public int LoanId { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateOnly ExpirationDate { get; set; }
    public string? Location { get; set; }

    public List<PhotoDto> Photos { get; set; } = [];
    public List<FileUploadDto> Files { get; set; } = [];
    public UserDto? Owner { get; set; }
    public LoanDto? Loan { get; set; }
}
