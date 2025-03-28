using System;
using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Validators;

public class CollateralCondition : ValidationAttribute
{
    public CollateralCondition() : base("Invalid collateral condition") { }
    protected override ValidationResult IsValid(object? value, ValidationContext context)
    {
        if (value is string condition)
        {
            var conditions = new List<string>
            {
                "high-quality",
                "low-quality",
                "stable",
                "depreciating",
                "liquid",
                "illiquid",
                "low-risk",
                "high-risk",
                "easily recoverable",
                "difficult to seize",
                "volatile",
                "secure",
                "undervalued",
                "overvalued",
                "appreciating",
                "depreciating rapidly",
                "diversified",
                "concentrated"
            };

            if (conditions.Contains(condition)) return ValidationResult.Success!;
        }

        return new ValidationResult("Invalid collateral condition");
    }
}
