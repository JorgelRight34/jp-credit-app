using System;

namespace api.DTOs.Armotization;

public class ArmotizationPaymentDto
{
    public decimal InterestValue { get; set; }
    public decimal CapitalValue { get; set; }
    public decimal PrincipalBalance { get; set; }
}
