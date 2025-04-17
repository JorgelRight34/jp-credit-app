using System;
using System.ComponentModel.DataAnnotations;
using api.Dtos.Validators;
using api.DTOs.Validators;
using api.Enums;

namespace api.DTOs.User;

public class RegisterDto
{
    // Database identification
    [Required]
    public string? Username { get; set; }
    public string? Password { get; set; }
    public string? Profession { get; set; }
    public string? Nationality { get; set; }

    // Names
    [Required]
    public string? FirstName { get; set; }
    [Required]
    public string? LastName { get; set; }
    [Required]
    [EmailAddress]
    public string? Email { get; set; }

    // Identification parameters
    [Required]
    [Gender]
    public char Gender { get; set; }
    [Required]
    public DateOnly DateOfBirth { get; set; }
    [Required]
    public MaritalStatus MaritalStatus { get; set; }
    [Required]
    [DNI]
    public string? DNI { get; set; }

    // Contact
    [Required]
    public string? Address { get; set; }
    public string? Landline { get; set; }   // Home's phone
    public string? OfficePhone { get; set; }

    // Roles
    public List<string> Roles { get; set; } = [];
}
