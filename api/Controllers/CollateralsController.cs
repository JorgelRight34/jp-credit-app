using api.DTOs.Collateral;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
    public class CollateralsController(ICollateralsRepository collateralsRepository) : BaseApiController
    {
        [HttpPost]
        public async Task<ActionResult<CollateralDto>> CreateCollateral([FromBody] CreateCollateralDto createCollateralDto)
        {
            var collateral = await collateralsRepository.CreateAsync(createCollateralDto);
            return CreatedAtAction(nameof(GetById), new { id = collateral.Id }, collateral);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<IEnumerable<CollateralDto>>> GetById([FromRoute] int id)
        {
            var collateral = await collateralsRepository.GetByIdAsync(id);
            return Ok(collateral);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CollateralDto>>> GetAll([FromQuery] CollateralQuery query)
        {
            var collaterals = await collateralsRepository.GetAllAsync(query);
            return Ok(collaterals);
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
    }
}
