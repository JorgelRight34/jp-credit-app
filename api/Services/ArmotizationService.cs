using System;
using api.DTOs.Armotization;
using api.DTOs.Transaction;
using api.Interfaces;
using api.Models;
using Microsoft.VisualBasic;

namespace api.Services;

public class ArmotizationService : IArmotizationService
{
    public List<ArmotizationPaymentDto> GenerateArmotization(
        decimal principal, decimal annualRate, decimal paymentFrecuency, decimal paymentValue, int n
    )
    {
        var transactions = new List<ArmotizationPaymentDto>();

        for (int i = 0; i < n; i++)
        {
            // Get periodly interest 
            var periodlyInterest = annualRate / paymentFrecuency;
            // Get interests I = balance * periodly interest
            var interests = principal * periodlyInterest;
            // Get capital, capital = P - I
            var capital = paymentValue - interests;

            principal -= capital;

            var transaction = new ArmotizationPaymentDto
            {
                InterestValue = interests,
                CapitalValue = capital,
                PrincipalBalance = principal,
            };
            transactions.Add(transaction);
        }

        return transactions;
    }

    public List<ArmotizationPaymentDto> GenerateCustomArmotization(GenerateArmotizationDto generateArmotizationDto)
    {
        var paymentValue = (decimal)Financial.Pmt(
            (double)(generateArmotizationDto.AnnualInterestRate / generateArmotizationDto.PaymentFrecuency),
            generateArmotizationDto.NumberOfPayments,
            (double)-generateArmotizationDto.PrincipalBalance
        );

        return GenerateArmotization(
            generateArmotizationDto.PrincipalBalance,
            generateArmotizationDto.AnnualInterestRate,
            generateArmotizationDto.PaymentFrecuency,
            paymentValue,
            generateArmotizationDto.NumberOfPayments
        );

    }

    public List<ArmotizationPaymentDto> GenerateLoanArmotization(Loan loan)
    {
        return GenerateArmotization(
            loan.PrincipalBalance,
            loan.AnnualInterestRate,
            loan.PaymentFrecuency,
            loan.PaymentValue,
            loan.NumberOfPayments
        );
    }
}
