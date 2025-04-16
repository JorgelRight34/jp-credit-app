using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using api.Dtos.Validators;
using api.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace api.Models;

public class AppUser : IdentityUser
{
    // Names
    [Required]
    public string? FirstName { get; set; }
    [Required]
    public string? LastName { get; set; }
    public string? Profession { get; set; }

    // Identification parameters
    [Required]
    public char Gender { get; set; }
    [Required]
    public DateOnly DateOfBirth { get; set; }
    [Required]
    public MaritalStatus MaritalStatus { get; set; }
    [Required]
    [DNI]
    public string? DNI { get; set; }
    public int? PhotoId { get; set; }

    // Contact
    [Required]
    public string? Address { get; set; }
    public string? Landline { get; set; }   // Home's phone
    public string? OfficePhone { get; set; }

    // Navigation properties
    [ForeignKey("PhotoId")]
    public Photo? Photo { get; set; }
}
