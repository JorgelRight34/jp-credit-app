using System;
using api.Dtos.Validators;

namespace api.DTOs.User;

public class UserQuery : Query
{
    public string? Username { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? DNI { get; set; }
    public int Age { get; set; }
}
