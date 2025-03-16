using System;
using System.ComponentModel.DataAnnotations;
using api.Dtos.Validators;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace api.Models;

public class AppUser : IdentityUser
{
    [Required]
    public char Gender { get; set; }
    [Required]
    public DateOnly DateOfBirth { get; set; }
    [Required]
    [DNI]
    public string? DNI { get; set; }
    [Required]
    public string? Neighborhood { get; set; }
    [Required]
    public string? MaritalStatus { get; set; }
}
