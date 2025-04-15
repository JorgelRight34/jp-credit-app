using System.Text;
using api.Data;
using api.DTOs.Transaction;
using api.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
    public class TransactionsController(
        ITransactionsRepository transactionsRepository,
        IReportsService reportsService,
        ApplicationDbContext context,
        IMapper mapper
    ) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransactionDto>>> GetAll([FromQuery] TransactionQuery query)
        {
            var transactions = await transactionsRepository.GetAllAsync(query);
            return Ok(transactions.Select(mapper.Map<TransactionDto>));
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<IEnumerable<TransactionDto>>> GetById([FromRoute] int id)
        {
            var transaction = await transactionsRepository.GetByIdAsync(id);
            if (transaction == null) return NotFound();

            return Ok(mapper.Map<TransactionDto>(transaction));
        }

        [HttpPost]
        public async Task<ActionResult<TransactionDto>> Create(
            [FromBody] CreateTransactionDto createTransactionDto
        )
        {
            var user = await context.Users.FindAsync(createTransactionDto.PayerId!);
            if (user == null) return BadRequest("User doesn't exist");

            var transaction = await transactionsRepository.CreateAsync(createTransactionDto);
            return CreatedAtAction(nameof(GetById), new { id = transaction.Id }, mapper.Map<TransactionDto>(transaction));
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            var transaction = await transactionsRepository.DeleteAsync(id);
            if (transaction == null) return NotFound();

            return NoContent();
        }

        [HttpGet("users/{userId}")]
        public async Task<ActionResult<IEnumerable<TransactionDto>>> GetUserTransactions([FromRoute] string userId)
        {
            var user = await context.Users.FindAsync(userId);
            if (user == null) return NotFound();

            var transactions = await transactionsRepository.GetUserTransactions(userId);

            return Ok(transactions.Select(mapper.Map<TransactionDto>));
        }

        [HttpGet("loans/{loanId:int}")]
        public async Task<ActionResult<IEnumerable<TransactionDto>>> GetLoanTransactions([FromRoute] int loanId)
        {
            var loan = await context.Loans.FindAsync(loanId);
            if (loan == null) return NotFound();

            var transactions = await transactionsRepository.GetLoanTransactions(loanId);

            return Ok(transactions.Select(mapper.Map<TransactionDto>));
        }

        [HttpGet("users/{userId}/csv")]
        public async Task<ActionResult<IEnumerable<TransactionDto>>> ExportUserTransactions([FromRoute] string userId)
        {
            var user = await context.Users.FindAsync(userId);
            if (user == null) return NotFound();

            var transactions = await transactionsRepository.GetUserTransactions(userId);
            var transactionsReport = reportsService.GenerateTransactionsCSVString(transactions);
            var buffer = Encoding.UTF8.GetBytes(transactionsReport);
            var stream = new MemoryStream(buffer);

            return File(stream, "text/csv", "user.csv");
        }

        [HttpGet("loans/{loanId:int}/csv")]
        public async Task<ActionResult<IEnumerable<TransactionDto>>> ExportLoanTransactions([FromRoute] int loanId)
        {
            var loan = await context.Loans.FindAsync(loanId);
            if (loan == null) return NotFound();

            var transactions = await transactionsRepository.GetLoanTransactions(loanId);
            var transactionsReport = reportsService.GenerateTransactionsCSVString(transactions);
            var buffer = Encoding.UTF8.GetBytes(transactionsReport);
            var stream = new MemoryStream(buffer);

            return File(stream, "text/csv", "loan.csv");
        }

    }
}
