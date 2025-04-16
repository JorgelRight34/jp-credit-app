using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

public class FileUpload
{
    [Key]
    public int Id { get; set; }
    public string? Url { get; set;}
    public string? PublicId { get; set; }
    public int CollateralId { get; set; }
    public string? Name { get; set; }
    public string? FileType { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime? LastModified { get; set; } = DateTime.Now;

    // Navigation properties
    [ForeignKey("CollateralId")]
    public Collateral? Collateral { get; set; }
}
