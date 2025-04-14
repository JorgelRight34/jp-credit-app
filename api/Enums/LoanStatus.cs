namespace api.Enums;

public enum LoanStatus
{
    Active,       // El préstamo está en curso y se están haciendo pagos regularmente
    Agreement,    // El préstamo está bajo un acuerdo de pago especial
    Judicial,     // El préstamo está en proceso judicial
    Legal,        // El préstamo ha sido transferido al departamento legal
    Punished,     // El préstamo ha sido castigado (probablemente irrecuperable)
    PaidOff       // El préstamo ha sido completamente pagado
}
