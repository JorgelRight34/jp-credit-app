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
        public async Task<ActionResult> Create()
        {
            if (!ModelState.IsValid) return BadRequest();

            var mockLoan = new Loan
            {
                Description = "Home Loan for Renovation",
                Amount = 50000.00m,
                DisbursedAmount = 48000.00m,
                AnnualInterestRate = 5.5m,
                NumberOfPayments = 12,
                PaymentFrecuency = 30,
                PaymentValue = 4500,
                StartDate = DateOnly.Parse("2025-01-01"),
                DeliveryDate = DateOnly.Parse("2025-01-05"),
                Status = "Pending",
                ClientId = "9c232a38-5ef6-4593-b6a3-0636a8c76f65",
                LoanOfficerId = "9c232a38-5ef6-4593-b6a3-0636a8c76f65",
                CollateralId = 1,
            };

            await context.Loans.AddAsync(mockLoan);

            await context.SaveChangesAsync();

            return Ok(mockLoan);

        }
    }
}
