using System;
using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Validators;

public class CollateralState : ValidationAttribute
{
    public CollateralState() : base("Invalid status") { }
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is string state)
        {
            var statesOptions = new List<string>
            {
                "pending",
                "approved",
                "rejected",
                "under review",
                "active",
                "inactive",
                "seized",
                "released",
                "defaulted",
                "cleared",
                "expired",
                "on hold"
            };
            if (statesOptions.Contains(state)) return ValidationResult.Success!;
        }
        return new ValidationResult("Invalid status");
    }
}
