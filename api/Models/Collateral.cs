using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

public class Collateral
{
    [Key]
    public int Id { get; set; }
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
    public string? AppUserId { get; set; }
    [Required]
    public int LoanId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;

    // Navigation Properties
    [ForeignKey("AppUserId")]
    public AppUser? AppUser { get; set; }
    [ForeignKey("LoanId")]
    public Loan? Loan { get; set; }
    public List<Photo> Photos { get; set; } = [];
}
