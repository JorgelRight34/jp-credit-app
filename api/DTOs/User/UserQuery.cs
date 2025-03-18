using System;

namespace api.DTOs.User;

public class UserQuery : Query
{
    public string? Username { get; set; }
    public int Age { get; set; }
}
