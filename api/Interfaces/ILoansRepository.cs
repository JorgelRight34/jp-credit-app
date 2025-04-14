using System;
using api.DTOs.Loan;
using api.Models;

namespace api.Interfaces;

public interface ILoansRepository
{
    Task<Loan> CreateAsync(CreateLoanDto createLoanDto);
    Task<Loan?> DeleteAsync(int id);
    Task<IEnumerable<Loan>> GetAllAsync(LoanQuery query);
    Task<Loan?> GetByIdAsync(int id);
    Task<Loan?> UpdateAsync(UpdateLoanDto updateLoanDto, int id);
}
