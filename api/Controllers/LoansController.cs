using api.Data;
using api.DTOs;
using api.DTOs.Loan;
using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class LoansController(ApplicationDbContext context) : BaseApiController
    {
        [HttpPost]
        public async Task<ActionResult> CreateLoan([FromBody] CreateLoanDto createLoanDto)
        {
            if (!ModelState.IsValid) return BadRequest();

            var loan = new Loan
            {
                Amount = createLoanDto.Amount,
                InterestRate = createLoanDto.InterestRate,
                StartDate = createLoanDto.StartDate,
                LoanOfficerId = createLoanDto.LoanOfficerId,
                AppUserId = createLoanDto.ClientId,
                CollateralId = createLoanDto.CollateralId,
            };

            await context.SaveChangesAsync();

            return Ok();

        }
    }
}
