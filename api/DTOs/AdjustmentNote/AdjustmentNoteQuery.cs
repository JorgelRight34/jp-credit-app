using System;

namespace api.DTOs.AdjustmentNote;

public class AdjustmentNoteQuery : Query
{
    public decimal MinValue { get; set; }
    public decimal MaxValue { get; set; }
    public int NoteId { get; set; }
    public int LoanId { get; set; }
}
