using api.Data;
using api.DTOs;
using api.DTOs.Loan;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class LoansController(ILoansRepository loansRepository) : BaseApiController
    {
        [HttpPost]
        public async Task<ActionResult<LoanDto>> Create([FromBody] CreateLoanDto createLoanDto)
        {
            if (!ModelState.IsValid) return BadRequest();

            var loan = await loansRepository.CreateAsync(createLoanDto);

            return Ok(loan);
        }
    }
}
