using api.DTOs.LoanOfficer;
using api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
    public class LoanOfficersController(ILoanOfficersRepository loanOfficerRepository) : BaseApiController
    {
        [HttpPost]
        public async Task<ActionResult<LoanOfficerDto>> Create(
            [FromBody] CreateLoanOfficerDto createLoanOfficerDto
        )
        {
            if (!ModelState.IsValid) return BadRequest();

            var loanOfficer = await loanOfficerRepository.CreateAsync(createLoanOfficerDto);
            return CreatedAtAction(nameof(GetById), new { Id = loanOfficer.Id }, loanOfficer);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LoanOfficerDto>>> GetAll([FromQuery] LoanOfficerQuery query)
        {
            var loanOfficers = await loanOfficerRepository.GetAllAsync(query);
            return Ok(loanOfficers);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<LoanOfficerDto>> GetById([FromRoute] int id)
        {
            var loanOfficer = await loanOfficerRepository.GetByIdAsync(id);
            if (loanOfficer == null) return BadRequest();

            return Ok(loanOfficer);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<LoanOfficerDto>> Update(
            [FromBody] UpdateLoanOfficerDto updateLoanOfficerDto, [FromRoute] int id
        )
        {
            if (!ModelState.IsValid) return BadRequest();

            var loanOfficer = await loanOfficerRepository.UpdateAsync(updateLoanOfficerDto, id);
            if (loanOfficer == null) return NotFound();

            return Ok(loanOfficer);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            var loanOfficer = await loanOfficerRepository.DeleteAsync(id);
            if (loanOfficer == null) return NotFound();

            return NoContent();
        }
    }
}
