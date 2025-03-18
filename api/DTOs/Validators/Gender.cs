using System;
using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Validators;

public class Gender : ValidationAttribute
{
    public Gender() : base("Gender must be 'M' for masculine or 'F' for feminine")
    {

    }

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is char gender)
        {
            if (gender == 'M' || gender == 'F') return ValidationResult.Success!;
        }
        return new ValidationResult("Gender must be 'M' for masculine or 'F' for feminine");
    }
}
