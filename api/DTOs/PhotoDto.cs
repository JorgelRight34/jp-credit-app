using System;
using System.ComponentModel.DataAnnotations;

namespace api.DTOs;

public class PhotoDto
{
    [Required]
    public int Id { get; set; }
    [Required]
    public string? Url { get; set; }
    [Required]
    public string? PublicId { get; set; }
}
