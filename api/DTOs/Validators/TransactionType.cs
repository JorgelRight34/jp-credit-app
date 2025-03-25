using System;
using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Validators;

public class TransactionType : ValidationAttribute
{
    public TransactionType() : base("Type must be 'DC', 'PC', 'NC' or 'ND'") { }
    protected override ValidationResult? IsValid(object? value, ValidationContext context)
    {
        if (value is string)
        {
            if ((string)value == "DC" || (string)value == "PC" || (string)value == "NC" || (string)value == "ND")
            {
                return ValidationResult.Success!;
            }
        }
        return new ValidationResult("Type must be 'DC', 'PC', 'NC' or 'ND'");
    }
}
