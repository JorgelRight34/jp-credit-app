using System;
using api.DTOs.LoanOfficer;
using api.Models;

namespace api.Interfaces;

public interface ILoanOfficersRepository
{
    public Task<LoanOfficerDto> CreateAsync(CreateLoanOfficerDto createLoanOfficerDto);
    public Task<LoanOfficerDto?> GetByIdAsync(int id);
    public Task<IEnumerable<LoanOfficerDto>> GetAllAsync(LoanOfficerQuery query);
    public Task<LoanOfficerDto?> UpdateAsync(UpdateLoanOfficerDto updateLoanOfficerDto, int id);
    public Task<LoanOfficerDto?> DeleteAsync(int id);
}
