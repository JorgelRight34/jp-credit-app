using System;
using api.DTOs.Armotization;
using api.DTOs.Transaction;
using api.Models;

namespace api.Interfaces;

public interface IReportsService
{
    string GenerateArmotizationsCSVString(IEnumerable<ArmotizationPaymentDto> armotizations);
    string GenerateTransactionsCSVString(IEnumerable<Transaction> transactions);
}
