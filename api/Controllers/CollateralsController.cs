using api.Data;
using api.DTOs.Collateral;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
    public class CollateralsController(
        ICollateralsRepository collateralsRepository, ApplicationDbContext context
    ) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CollateralDto>>> GetAll([FromQuery] CollateralQuery query)
        {
            var collaterals = await collateralsRepository.GetAllAsync(query);
            return Ok(collaterals);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<IEnumerable<CollateralDto>>> GetById([FromRoute] int id)
        {
            var collateral = await collateralsRepository.GetByIdAsync(id);
            if (collateral == null) return NotFound();
            return Ok(collateral);
        }

        [HttpPost]
        public async Task<ActionResult<CollateralDto>> Create([FromBody] CreateCollateralDto createCollateralDto)
        {
            var user = await context.Users.FindAsync(createCollateralDto.ClientId);
            if (user == null) return BadRequest("User doesn't exist");

            var loan = await context.Loans.FindAsync(createCollateralDto.LoanId);
            if (loan == null) return BadRequest("Loan doesn't exist");

            var collateral = await collateralsRepository.CreateAsync(createCollateralDto);
            return CreatedAtAction(nameof(GetById), new { id = collateral.Id }, collateral);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<CollateralDto>> Update(
            [FromBody] UpdateCollateralDto updateCollateralDto, [FromRoute] int id
        )
        {
            var collateral = await collateralsRepository.UpdateAsync(updateCollateralDto, id);
            return Ok(collateral);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            var collateral = await collateralsRepository.DeleteAsync(id);
            if (collateral == null) return NotFound();

            return NoContent();
        }

        // Photos
        [HttpPost("{id:int}/photo")]
        public async Task<ActionResult<CollateralDto>> CreatePhoto([FromForm] IFormFile file, [FromRoute] int id)
        {
            var collateral = await context.Collaterals.FindAsync(id);
            if (collateral == null) return BadRequest("Collateral doesn't exist");

            var collateralWithPhoto = await collateralsRepository.AddCollateralPhotoAsync(file, collateral);

            return CreatedAtAction(nameof(GetById), new { id = collateralWithPhoto.Id }, collateralWithPhoto);
        }

        [HttpDelete("{collateralId:int}/photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto([FromRoute] int collateralId, [FromRoute] string photoId)
        {
            var collateral = await context.Collaterals.FindAsync(collateralId);
            if (collateral == null) return BadRequest("Colatteral doesn't exist");

            await collateralsRepository.DeleteCollateralPhotoAsync(photoId);

            return NoContent();
        }
    }
}
