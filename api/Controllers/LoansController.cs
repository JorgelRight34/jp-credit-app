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

            return CreatedAtAction(nameof(GetById), new { id = loan.Id }, loan);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<LoanDto>> GetById([FromRoute] int id)
        {
            var loan = await loansRepository.GetByIdAsync(id);
            return Ok(loan);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LoanDto>>> GetAll([FromQuery] LoanQuery query)
        {
            var loans = await loansRepository.GetAllAsync(query);
            return Ok(loans);
        }
    }
}
