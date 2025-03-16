using System;
using System.ComponentModel.DataAnnotations;
using api.Dtos.Validators;

namespace api.DTOs.User;

public class UpdateUserDto
{
    [EmailAddress]
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public DateOnly DateOfBirth { get; set; }
    [DNI]
    public string? DNI { get; set; }
    public string? Neighborhood { get; set; }
    public string? MaritalStatus { get; set; }
    public List<string> Roles { get; set; } = [];
}
