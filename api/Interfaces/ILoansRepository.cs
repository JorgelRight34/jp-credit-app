using System;
using api.DTOs.Loan;

namespace api.Interfaces;

public interface ILoansRepository
{
    Task<LoanDto> CreateAsync(CreateLoanDto createLoanDto);
    Task<LoanDto?> DeleteAsync(int id);
    Task<IEnumerable<LoanDto>> GetAllAsync(LoanQuery query);
    Task<LoanDto?> GetByIdAsync(int id);
    Task<LoanDto?> UpdateAsync(UpdateLoanDto updateLoanDto, int id);
}
