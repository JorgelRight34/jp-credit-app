using System;

namespace api.DTOs.Loan;

public class LoanQuery : Query
{
    public string? ClientId { get; set; }
    public string? Username { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? Status { get; set; }
}
