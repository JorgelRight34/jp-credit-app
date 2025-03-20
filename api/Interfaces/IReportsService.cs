using System;
using api.DTOs.Armotization;
using api.DTOs.Transaction;

namespace api.Interfaces;

public interface IReportsService
{
    string GenerateArmotizationsCSVString(IEnumerable<ArmotizationPaymentDto> armotizations);
    string GenerateTransactionsCSVString(IEnumerable<TransactionDto> transactions);
}
