using api.DTOs.AdjustmentNote;
using api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
    public class AdjustmentNotesController(
        IAdjustmentNotesRepository adjustmentNotesRepository
    ) : BaseApiController
    {
        [HttpPost]
        public async Task<ActionResult<AdjustmentNoteDto>> Create(
            [FromBody] CreateAdjustmentNoteDto createAdjustmentNoteDto
        )
        {
            var note = await adjustmentNotesRepository.CreateAsync(createAdjustmentNoteDto);
            return CreatedAtAction(nameof(GetById), new { id = note.Id }, note);
        }

        [HttpGet("error")]
        public ActionResult TestError()
        {
            throw new Exception("Testing error");
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<AdjustmentNoteDto>> GetById([FromRoute] int id)
        {
            var note = await adjustmentNotesRepository.GetByIdAsync(id);
            if (note == null) return NotFound();

            return Ok(note);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdjustmentNoteDto>>> GetAll(
            [FromQuery] AdjustmentNoteQuery query
        )
        {
            var notes = await adjustmentNotesRepository.GetAllAsync(query);
            return Ok(notes);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<AdjustmentNoteDto>> Update(
            [FromBody] UpdateAdjustmentNoteDto updateAdjustmentNoteDto, [FromRoute] int id
        )
        {
            var note = await adjustmentNotesRepository.UpdateAsync(updateAdjustmentNoteDto, id);
            if (note == null) return NotFound();

            return Ok(note);
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
