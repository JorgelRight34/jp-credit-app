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
            // List to hold the possible states of a loan
            var options = new List<string>
            {
                // The loan is currently active and the borrower is making payments as agreed.
                "active", 

                // The borrower has been notified of a certain issue with the loan, possibly due to missed payments or other conditions. 
                // This could serve as a warning or formal communication.
                "notified", 

                // The loan is in default or delinquent, and penalties or fees may have been imposed on the borrower. 
                // It indicates that the borrower has violated the terms of the loan agreement.
                "punished", 

                // The loan has entered a legal process, potentially meaning that the lender is taking legal action, such as initiating a lawsuit, to recover the debt.
                "legal", 

                // The loan is going through a judicial process, which may involve court proceedings like foreclosure or litigation for debt recovery.
                "judicial", 

                // The borrower and lender have reached a settlement or renegotiated the loan terms. This could involve restructuring the loan or offering new terms for repayment.
                "agreement"
            };

            if (options.Contains(state)) return ValidationResult.Success!;
        }

        return new ValidationResult("Invalid state");
    }
}
