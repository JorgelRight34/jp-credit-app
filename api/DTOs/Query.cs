using System;

namespace api.DTOs;

public class Query
{
    public int Page { get; set; }
    public int Limit { get; set; } = 10;
}
