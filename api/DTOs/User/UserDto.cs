using System;
using System.ComponentModel.DataAnnotations;
using api.Dtos.Validators;
using api.DTOs.Validators;

namespace api.DTOs.User;

public class UserDto
{
    // Database identification
    public string? Id { get; set; }
    public string? Username { get; set; }

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
    public int Age { get; set; }
    [Required]
    public DateOnly DateOfBirth { get; set; }
    [Required]
    public string? MaritalStatus { get; set; }
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
