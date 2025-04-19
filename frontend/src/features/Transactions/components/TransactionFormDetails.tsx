import { useMemo } from "react";
import { toCurrency } from "../../../utils/utils";
import useLoan from "../../Loans/hooks/useLoan";
import FinancialCard from "../../../common/ui/FinancialCard";

interface TransactionFormDetailsProps {
  loanId: number;
  amount: number;
  className?: string;
}

const TransactionFormDetails = ({
  amount,
  loanId,
  className = "",
}: TransactionFormDetailsProps) => {
  const { loan, isLoading, isError } = useLoan(loanId);

  const totalDeliquency = useMemo(() => {
    return loan?.transactions?.reduce(
      (prev, curr) => curr.delinquency + prev,
      0
    );
  }, [loan]);

  const penaltyFee = useMemo(() => {
    // Total penalty fee between all payments
    return loan?.transactions?.reduce(
      (prev, curr) => curr.penaltyFee + prev,
      0
    );
  }, [loan]);

  const interests = useMemo(() => {
    if (!loan) return 0;
    return (
      loan.principalBalance * (loan.annualInterestRate / loan.paymentFrequency)
    );
  }, [loan]);

  const capital = useMemo(() => {
    if (!loan) return 0;
    return (
      amount -
      loan.principalBalance * (loan.annualInterestRate / loan.paymentFrequency)
    );
  }, [amount, loan]);

  if (isLoading) return <h1>Loading...</h1>;

  if ((isError || !loan) && loanId) {
    return <h6 className="text-danger">El préstamo #{loanId} no existe</h6>;
  }

  if (!loanId || !loan) return <></>;

  return (
    <div className={`row mx-0 ${className}`}>
      <div className="col-lg-6">
        <FinancialCard
          title={`Prestamo #${loanId}`}
          subheading="Cuota"
          heading={toCurrency(loan.paymentValue)}
          headers={[
            ["Atraso", toCurrency(loan.paymentValue)],
            ["Interés Anual", `${loan.annualInterestRate * 100}%`],
            ["Mora", toCurrency(totalDeliquency || 0)],
          ]}
        />
      </div>
      <div className="col-lg-6">
        <FinancialCard
          title={`Prevista del Pago`}
          subheading="Monto"
          heading={toCurrency(amount)}
          headers={[
            ["Capital", toCurrency(capital)],
            ["Intereses", toCurrency(interests)],
            ["Mora", toCurrency(penaltyFee || 0)],
          ]}
        />
      </div>
    </div>
  );
};

export default TransactionFormDetails;
