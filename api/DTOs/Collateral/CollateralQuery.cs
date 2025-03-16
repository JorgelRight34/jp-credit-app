using System;

namespace api.DTOs.Collateral;

public class CollateralQuery
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public int Page { get; set; }
    public int Limit { get; set; } = 10;
}
