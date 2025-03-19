using System;
using api.DTOs.Armotization;
using api.DTOs.Transaction;

namespace api.Interfaces;

public interface IArmotizationService
{
    List<ArmotizationPaymentDto> GenerateArmotization(
        decimal principal, decimal annualRate, decimal paymentFrecuency, decimal paymentValue, int n
    );
}
