using System.Net;
using System.Text;
using api.Data;
using api.DTOs.Armotization;
using api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
    public class ArmotizationsController(
        IArmotizationService armotizationService,
        IReportsService reportsService,
        ApplicationDbContext context
    ) : BaseApiController
    {
        [HttpGet("loans/{loanId:int}")]
        public async Task<ActionResult<List<ArmotizationPaymentDto>>> GenerateLoanArmotization([FromRoute] int loanId)
        {
            var loan = await context.Loans.FindAsync(loanId);
            if (loan == null) return BadRequest("Loan doesn't exist");

            var armotizations = armotizationService.GenerateLoanArmotization(loan);

            return Ok(armotizations);
        }

        [HttpGet]
        public ActionResult<List<ArmotizationPaymentDto>> GenerateArmotization(
            [FromQuery] GenerateArmotizationDto generateArmotizationDto
        )
        {
            var armotizations = armotizationService.GenerateCustomArmotization(generateArmotizationDto);

            return Ok(armotizations);
        }

        [HttpGet("loans/{loanId:int}/csv")]
        public async Task<ActionResult> ExportLoanArmotization([FromRoute] int loanId)
        {
            var loan = await context.Loans.FindAsync(loanId);
            if (loan == null) return BadRequest("Loan doesn't exist");

            var armotizations = armotizationService.GenerateLoanArmotization(loan);
            var csvBuffer = Encoding.UTF8.GetBytes(reportsService.GenerateArmotizationsCSVString(armotizations));
            var stream = new MemoryStream(csvBuffer);

            return File(stream, "text/csv", "loan-armotizations.csv");
        }

        [HttpGet("csv")]
        public ActionResult ExportArmotization([FromQuery] GenerateArmotizationDto generateArmotizationDto)
        {
            var armotizations = armotizationService.GenerateCustomArmotization(generateArmotizationDto);
            var csvBuffer = Encoding.UTF8.GetBytes(reportsService.GenerateArmotizationsCSVString(armotizations));
            var stream = new MemoryStream(csvBuffer);

            return File(stream, "text/csv", "armotization.csv");
        }
    }
}
