using System;
using api.DTOs.Loan;
using api.Interfaces;

namespace api.Repositories;

public class LoansRepository : ILoansRepository
{
    public Task<LoanDto> CreateAsync(CreateLoanDto createLoanDto)
    {
        throw new NotImplementedException();
    }
}
