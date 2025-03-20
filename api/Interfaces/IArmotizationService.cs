using System;
using api.DTOs.Armotization;
using api.DTOs.Transaction;
using api.Models;

namespace api.Interfaces;

public interface IArmotizationService
{
    List<ArmotizationPaymentDto> GenerateArmotization(
        decimal principal, decimal annualRate, decimal paymentFrecuency, decimal paymentValue, int n
    );
    List<ArmotizationPaymentDto> GenerateLoanArmotization(Loan loan);
    List<ArmotizationPaymentDto> GenerateCustomArmotization(GenerateArmotizationDto loan);
}
