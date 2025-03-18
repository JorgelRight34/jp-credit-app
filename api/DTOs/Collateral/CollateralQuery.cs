using System;

namespace api.DTOs.Collateral;

public class CollateralQuery : Query
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public decimal MinValue { get; set; }
    public decimal MaxValue { get; set; }
}
