using System;
using System.ComponentModel.DataAnnotations;
using api.Dtos.Validators;

namespace api.DTOs.User;

public class UserDto
{
    public string? Id { get; set; }
    public string? Username { get; set; }
    [EmailAddress]
    public string? Email { get; set; }
    public int Age { get; set; }
    [Required]
    [DNI]
    public string? DNI { get; set; }
    [Required]
    public string? Neighborhood { get; set; }
    [Required]
    public string? MaritalStatus { get; set; }
    public DateOnly DateOfBirth { get; set; }
}
