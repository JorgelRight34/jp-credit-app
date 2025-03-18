using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

public class Photo
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string? Url { get; set; }
    [Required]
    public string? PublicId { get; set; }
    public int? CollateralId { get; set; }
    public string? UserId { get; set; }

    [ForeignKey("CollateralId")]
    public Collateral? Collateral { get; set; }
    [ForeignKey("UserId")]
    public AppUser? User { get; set; }

}
