using api.Data;
using api.DTOs;
using api.DTOs.Loan;
using api.Interfaces;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class LoansController(
        ILoansRepository loansRepository,
        UserManager<AppUser> userManager,
        IMapper mapper
    ) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LoanDto>>> GetAll([FromQuery] LoanQuery query)
        {
            var loans = await loansRepository.GetAllAsync(query);
            return Ok(loans.Select(mapper.Map<LoanDto>));
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<LoanDto>> GetById([FromRoute] int id)
        {
            var loan = await loansRepository.GetByIdAsync(id);
            return Ok(mapper.Map<LoanDto>(loan));
        }

        [HttpPost]
        public async Task<ActionResult<LoanDto>> Create([FromBody] CreateLoanDto createLoanDto)
        {
            var client = await userManager.FindByIdAsync(createLoanDto.ClientId!);
            if (client == null) return BadRequest("Client doesn't exist");

            var loan = await loansRepository.CreateAsync(createLoanDto);
            var loanDto = mapper.Map<LoanDto>(loan);

            return CreatedAtAction(nameof(GetById), new { id = loan.Id }, loanDto);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<LoanDto>> Update([FromBody] UpdateLoanDto updateLoanDto, [FromRoute] int id)
        {
            var loan = await loansRepository.UpdateAsync(updateLoanDto, id);
            if (loan == null) return NotFound();

            return Ok(mapper.Map<LoanDto>(loan));
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<LoanDto>> Delete([FromRoute] int id)
        {
            var loan = await loansRepository.DeleteAsync(id);
            if (loan == null) return NotFound();

            return NoContent();
        }
    }
}
