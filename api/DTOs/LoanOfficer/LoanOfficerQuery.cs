using System;

namespace api.DTOs.LoanOfficer;

public class LoanOfficerQuery
{
    public string? Neighborhood { get; set; }
    public int Page { get; set; }
    public int Limit { get; set; } = 10;
}
