using System;
using System.ComponentModel.DataAnnotations;
using api.Dtos.Validators;

namespace api.DTOs.User;

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
    [Required]
    public DateOnly DateOfBirth { get; set; }
    [DNI]
    public string? DNI { get; set; }
    [Required]
    public string? MaritalStatus { get; set; }
    [Required]
    public string? Neighborhood { get; set; }
    public List<string> Roles { get; set; } = [];
}
