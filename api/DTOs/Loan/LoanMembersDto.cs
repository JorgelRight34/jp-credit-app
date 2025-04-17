using System;
using api.DTOs.User;

namespace api.DTOs.Loan;

public class LoanMembersDto
{
    public UserDto? Client { get; set; }
    public UserDto? Guarantor { get; set; }
    public UserDto? LoanOfficer { get; set; }
}
