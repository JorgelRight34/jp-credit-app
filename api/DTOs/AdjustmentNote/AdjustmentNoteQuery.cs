using System;

namespace api.DTOs.AdjustmentNote;

public class AdjustmentNoteQuery
{
    public decimal MinValue { get; set; }
    public decimal MaxValue { get; set; }
    public int Page { get; set; }
    public int Limit { get; set; } = 10;
}
