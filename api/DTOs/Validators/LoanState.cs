using System;
using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Validators;

public class LoanState : ValidationAttribute
{
    public LoanState() : base("Invalid state") { }

    protected override ValidationResult IsValid(object? value, ValidationContext validationContext)
    {
        if (value is string state)
        {
            var options = new List<string>
            {
                "active",
                "inactive"
            };

            if (options.Contains(state)) return ValidationResult.Success!;
        }

        return new ValidationResult("Invalid state");
    }
}
