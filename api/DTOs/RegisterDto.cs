using System;
using System.ComponentModel.DataAnnotations;
using api.Dtos.Validators;

namespace api.DTOs;

public class RegisterDto
{
    [Required]
    public string? Username { get; set; }
    [Required]
    [EmailAddress]
    public string? Email { get; set; }
    [Required]
    public string? Password { get; set; }
    [Required]
    public string? PhoneNumber { get; set; }
    [DNI]
    public string? DNI { get; set; }
    public List<string> Roles { get; set; } = [];
}
