using System;
using api.Models;
using Microsoft.VisualBasic;

namespace api.Extensions;

public static class LoanExtensions
{
    public static Loan CalculatePaymentValue(this Loan loan)
    {
        loan.PaymentValue = (decimal)Financial.Pmt(
            (double)(loan.AnnualInterestRate / loan.PaymentFrecuency),
            loan.NumberOfPayments,
            (double)-loan.PrincipalBalance
        );

        return loan;
    }

    public static double CalculateEffectiveAnnualRate(this Loan loan)
    {
        // Convert to effective annual rate
        return Math.Pow(1 + (double)(loan.AnnualInterestRate / loan.PaymentFrecuency), (double)loan.PaymentFrecuency) - 1;
    }
}
