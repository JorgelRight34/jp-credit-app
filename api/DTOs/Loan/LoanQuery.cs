using System;

namespace api.DTOs.Loan;

public class LoanQuery : Query
{
    public string? ClientId { get; set; }
    public string? Username { get; set; }
}
