using System;
using System.Text;
using api.DTOs.Armotization;
using api.DTOs.Transaction;
using api.Interfaces;
using api.Models;

namespace api.Services;

public class ReportsService : IReportsService
{
    public string GenerateArmotizationsCSVString(IEnumerable<ArmotizationPaymentDto> armotizations)
    {
        var sb = new StringBuilder();
        sb.AppendLine("Capital,Interests,Principal");

        foreach (var armotization in armotizations)
        {
            sb.AppendLine(string.Join(
                ",",
                Math.Round(armotization.CapitalValue, 2),
                Math.Round(armotization.InterestValue, 2),
                Math.Round(armotization.PrincipalBalance, 2)
            ));
        }

        return sb.ToString();
    }

    public string GenerateTransactionsCSVString(IEnumerable<Transaction> transactions)
    {
        var sb = new StringBuilder();
        sb.AppendLine("Id,Capital,Interests,Delinquency,LoanId,Date");

        foreach (var transaction in transactions)
        {
            sb.AppendLine(string.Join(
                ",",
                transaction.Id,
                Math.Round(transaction.CapitalValue, 2),
                Math.Round(transaction.InterestValue, 2),
                Math.Round(transaction.Delinquency, 2),
                transaction.LoanId,
                transaction.Date.ToString()
            ));
        }

        return sb.ToString();
    }
}
