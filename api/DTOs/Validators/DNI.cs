using System;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace api.Dtos.Validators;

public class DNI : ValidationAttribute
{
    protected override ValidationResult IsValid(object? value, ValidationContext validationContext)
    {
        if (value == null)
        {
            return new ValidationResult("DNI is required");
        }

        if (value is not string dni)
        {
            return new ValidationResult("Invalid DNI format");
        }

        if (!Regex.IsMatch(dni, @"^\d{11}$"))
        {
            return new ValidationResult("DNI must be exactly 11 digits");
        }

        return ValidationResult.Success!;
    }
}
