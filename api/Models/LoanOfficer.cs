using System;
using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class LoanOfficer
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string? Neighborhood { get; set; }
    public List<Loan>? Loans { get; set; }
}
