using System;

namespace api.DTOs;

public class UserQuery
{
    public string? Username { get; set; }
    public int Age { get; set; }
    public int Page { get; set; }
    public int Limit { get; set; } = 10;
}
