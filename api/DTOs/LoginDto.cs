using System;
using System.ComponentModel.DataAnnotations;

namespace api.DTOs;

public class LoginDto
{
    [Required]
    public string Username { get; set; } = String.Empty;
    [Required]
    public string Password { get; set; } = String.Empty;
}
