using System.Text.Json;
using api.Data;
using api.DTOs.Collateral;
using api.Interfaces;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
    public class CollateralsController(
        ICollateralsRepository collateralsRepository, ApplicationDbContext context, IMapper mapper
    ) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CollateralDto>>> GetAll([FromQuery] CollateralQuery query)
        {
            var collaterals = await collateralsRepository.GetAllAsync(query);
            return Ok(collaterals.Select(mapper.Map<CollateralDto>));
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<IEnumerable<CollateralDto>>> GetById([FromRoute] int id)
        {
            var collateral = await collateralsRepository.GetByIdAsync(id);
            if (collateral == null) return NotFound();

            return Ok(mapper.Map<CollateralDto>(collateral));
        }

        [HttpPost]
        public async Task<ActionResult<CollateralDto>> Create([FromBody] CreateCollateralDto createCollateralDto)
        {
            var user = await context.Users.FindAsync(createCollateralDto.OwnerId);
            if (user == null) return BadRequest("User doesn't exist");

            var loan = await context.Loans.FindAsync(createCollateralDto.LoanId);
            if (loan == null) return BadRequest("Loan doesn't exist");

            var collateral = await collateralsRepository.CreateAsync(createCollateralDto);
            var collateralDto = mapper.Map<CollateralDto>(collateral);


            return CreatedAtAction(nameof(GetById), new { id = collateral.Id }, collateralDto);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<CollateralDto>> Update(
            [FromBody] UpdateCollateralDto updateCollateralDto, [FromRoute] int id
        )
        {
            var collateral = await collateralsRepository.UpdateAsync(updateCollateralDto, id);

            return Ok(mapper.Map<CollateralDto>(collateral));
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
        public async Task<ActionResult<CollateralDto>> CreatePhoto([FromForm] List<IFormFile> files, [FromRoute] int id)
        {
            var collateral = await context.Collaterals.FindAsync(id);
            if (collateral == null) return BadRequest("Collateral doesn't exist.");

            if (files.Count == 0) return BadRequest("Files are empty.");

            foreach (var file in files)
            {
                collateral = await collateralsRepository.AddCollateralPhotoAsync(file, collateral);
            }
            var collateralDto = mapper.Map<CollateralDto>(collateral);

            return Ok(collateralDto);
        }

        [HttpPost("{id:int}/files")]
        public async Task<ActionResult<CollateralDto>> CreateFile([FromForm] List<IFormFile> files, [FromRoute] int id)
        {
            var collateral = await collateralsRepository.GetByIdAsync(id);
            if (collateral == null) return BadRequest("Collateral doesn't exist.");

            if (files.Count == 0) return BadRequest("Files are empty.");

            foreach (var file in files)
            {
                collateral = await collateralsRepository.AddCollateralFileAsync(file, collateral);

            }
            var collateralDto = mapper.Map<CollateralDto>(collateral);

            return Ok(collateralDto);
        }

        [HttpDelete("{collateralId:int}/photo/{publicId}")]
        public async Task<ActionResult> DeletePhoto([FromRoute] int collateralId, [FromRoute] string publicId)
        {
            var collateral = await context.Collaterals.FindAsync(collateralId);
            if (collateral == null) return BadRequest("Collateral doesn't exist");

            await collateralsRepository.DeleteCollateralPhotoAsync(publicId);

            return NoContent();
        }

        [HttpDelete("{collateralId:int}/files/{publicId}")]
        public async Task<ActionResult> DeleteFile([FromRoute] int collateralId, [FromRoute] string publicId)
        {
            var collateral = await context.Collaterals.FindAsync(collateralId);
            if (collateral == null) return BadRequest("Collateral doesn't exist");

            await collateralsRepository.DeleteCollateralFileAsync(publicId);

            return NoContent();
        }
    }
}
