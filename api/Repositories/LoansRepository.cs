using System;
using api.Data;
using api.DTOs.Loan;
using api.Interfaces;
using api.Models;
using AutoMapper;
using Microsoft.VisualBasic;

namespace api.Repositories;

public class LoansRepository(ApplicationDbContext context, IMapper mapper) : ILoansRepository
{
    public async Task<LoanDto> CreateAsync(CreateLoanDto createLoanDto)
    {
        // Convert to effective annual rate
        double periodsPerYear = 12;
        switch (createLoanDto.PaymentFrecuency)
        {
            case "M":
                periodsPerYear = 12;
                break;
            case "A":
                periodsPerYear = 1;
                break;
        }

        double effectiveRate = Math.Pow(1 + ((double)createLoanDto.AnnualInterestRate / periodsPerYear), periodsPerYear) - 1;
        Console.WriteLine(effectiveRate);

        double annualPayment = Financial.Pmt(
            effectiveRate,
            createLoanDto.NumberOfPayments,
            (double)-createLoanDto.DisbursedAmount
        );

        var loan = mapper.Map<Loan>(createLoanDto);
        loan.PaymentValue = (decimal)annualPayment;

        await context.Loans.AddAsync(loan);
        await context.SaveChangesAsync();

        return mapper.Map<LoanDto>(loan);
    }
}
