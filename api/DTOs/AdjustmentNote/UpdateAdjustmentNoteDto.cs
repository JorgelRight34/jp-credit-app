using System;
using System.ComponentModel.DataAnnotations;

namespace api.DTOs.AdjustmentNote;

public class UpdateAdjustmentNoteDto
{
    public string? Description { get; set; }
    [Required]
    public decimal Amount { get; set; }
    [Required]
    public DateOnly Date { get; set; }
}
