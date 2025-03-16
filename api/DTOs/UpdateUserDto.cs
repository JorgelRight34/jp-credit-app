using System;
using System.ComponentModel.DataAnnotations;

namespace api.DTOs;

public class UpdateUserDto
{
    [EmailAddress]
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public List<string> Roles { get; set; } = [];
}
