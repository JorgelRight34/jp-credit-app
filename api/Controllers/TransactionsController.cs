using api.DTOs.Transaction;
using api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
    public class TransactionsController(ITransactionsRepository transactionsRepository) : BaseApiController
    {
        [HttpPost]
        public async Task<ActionResult<TransactionDto>> Create([FromBody] CreateTransactionDto createTransactionDto)
        {
            var transaction = await transactionsRepository.CreateAsync(createTransactionDto);
            return Ok(transaction);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<IEnumerable<TransactionDto>>> GetById([FromRoute] int id)
        {
            var transaction = await transactionsRepository.GetByIdAsync(id);
            if (transaction == null) return NotFound();

            return Ok(transaction);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransactionDto>>> GetAll([FromQuery] TransactionQuery query)
        {
            var transactions = await transactionsRepository.GetAllAsync(query);
            return Ok(transactions);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<TransactionDto>> Update(
            [FromBody] UpdateTransactionDto updateTransactionDto, [FromRoute] int id
        )
        {
            var transaction = await transactionsRepository.UpdateAsync(updateTransactionDto, id);
            return Ok(transaction);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            var transaction = await transactionsRepository.DeleteAsync(id);
            if (transaction == null) return NotFound();

            return NoContent();
        }
    }
}
