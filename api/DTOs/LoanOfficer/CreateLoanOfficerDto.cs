using System;
using System.ComponentModel.DataAnnotations;

namespace api.DTOs.LoanOfficer;

public class CreateLoanOfficerDto
{
    [Required]
    public string? Neighborhood { get; set; }
}
