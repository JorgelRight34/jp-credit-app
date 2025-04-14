using api.Data;
using api.DTOs.AdjustmentNote;
using api.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
    public class AdjustmentNotesController(
        IAdjustmentNotesRepository adjustmentNotesRepository,
        ApplicationDbContext context,
        IMapper mapper
    ) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdjustmentNoteDto>>> GetAll(
          [FromQuery] AdjustmentNoteQuery query
      )
        {
            var notes = await adjustmentNotesRepository.GetAllAsync(query);
            return Ok(notes.Select(mapper.Map<AdjustmentNoteDto>));
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<AdjustmentNoteDto>> GetById([FromRoute] int id)
        {
            var note = await adjustmentNotesRepository.GetByIdAsync(id);
            if (note == null) return NotFound();

            return Ok(mapper.Map<AdjustmentNoteDto>(note));
        }

        [HttpPost]
        public async Task<ActionResult<AdjustmentNoteDto>> Create(
            [FromBody] CreateAdjustmentNoteDto createAdjustmentNoteDto
        )
        {
            var loan = await context.Loans.FindAsync(createAdjustmentNoteDto.LoanId);
            if (loan == null) return BadRequest("Loan doesn't exist");

            var note = await adjustmentNotesRepository.CreateAsync(createAdjustmentNoteDto);
            var noteDto = mapper.Map<AdjustmentNoteDto>(note);

            return CreatedAtAction(nameof(GetById), new { id = note.Id }, noteDto);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<AdjustmentNoteDto>> Update(
            [FromBody] UpdateAdjustmentNoteDto updateAdjustmentNoteDto, [FromRoute] int id
        )
        {
            var note = await adjustmentNotesRepository.UpdateAsync(updateAdjustmentNoteDto, id);
            if (note == null) return NotFound();

            return Ok(mapper.Map<AdjustmentNoteDto>(note));
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            var note = await adjustmentNotesRepository.DeleteAsync(id);
            if (note == null) return NotFound();

            return NoContent();
        }
    }
}
