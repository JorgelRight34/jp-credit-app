using System;
using api.DTOs.Loan;

namespace api.Interfaces;

public interface ILoansRepository
{
    Task<LoanDto> CreateAsync(CreateLoanDto createLoanDto);
}
