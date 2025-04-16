using System;
using api.DTOs.Loan;
using api.DTOs.Transaction;

namespace api.DTOs.User;

public class UserStatsDto
{
    public LoanDto? LastLoan { get; set; }
    public TransactionDto? LastTransaction { get; set; }
    public int LoanCount { get; set; }
    public int CollateralCount { get; set; }
}
