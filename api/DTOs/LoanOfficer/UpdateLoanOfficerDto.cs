using System;
using System.ComponentModel.DataAnnotations;

namespace api.DTOs.LoanOfficer;

public class UpdateLoanOfficerDto
{
    [Required]
    public string? Neighborhood { get; set; }
}
