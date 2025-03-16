using System;
using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class Loan
{
    [Key]
    public int Id;
    public int LoanOfficerId { get; set; }
    public string? AppUserId { get; set; }
    public LoanOfficer? LoanOfficer { get; set; }
    public AppUser? User { get; set; }
}
