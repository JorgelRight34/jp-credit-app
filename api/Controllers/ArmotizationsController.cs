using api.Data;
using api.DTOs.Armotization;
using api.DTOs.Transaction;
using api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;

namespace api.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
    public class ArmotizationsController(
        IArmotizationService armotizationService,
        ApplicationDbContext context
    ) : BaseApiController
    {
        [HttpGet("loans/{loanId:int}")]
        public async Task<ActionResult<List<ArmotizationPaymentDto>>> GenerateLoanArmotization([FromRoute] int loanId)
        {
            var loan = await context.Loans.FindAsync(loanId);
            if (loan == null) return BadRequest("Loan doesn't exist");

            var armotizations = armotizationService.GenerateArmotization(
                loan.PrincipalBalance,
                loan.AnnualInterestRate,
                loan.PaymentFrecuency,
                loan.PaymentValue,
                loan.NumberOfPayments
            );

            return Ok(armotizations);
        }

        [HttpGet]
        public ActionResult<List<ArmotizationPaymentDto>> GenerateArmotization(
            [FromQuery] GenerateArmotizationDto generateArmotizationDto
        )
        {
            var paymentValue = (decimal)Financial.Pmt(
                (double)(generateArmotizationDto.AnnualInterestRate / generateArmotizationDto.PaymentFrecuency),
                generateArmotizationDto.NumberOfPayments,
                (double)-generateArmotizationDto.PrincipalBalance
            );

            var armotizations = armotizationService.GenerateArmotization(
                generateArmotizationDto.PrincipalBalance,
                generateArmotizationDto.AnnualInterestRate,
                generateArmotizationDto.PaymentFrecuency,
                paymentValue,
                generateArmotizationDto.NumberOfPayments
            );

            return Ok(armotizations);
        }
    }
}
