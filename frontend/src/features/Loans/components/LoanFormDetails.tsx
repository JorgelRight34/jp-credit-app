import { useMemo } from "react";
import { getPmt, getTotalInterest, toCurrency } from "../../../utils/utils";
import FinancialCard from "../../../common/ui/FinancialCard";

interface LoanFormDefaultProps {
  amount: number;
  annualInterestRate: number;
  nPer: number;
  paymentFrequency: number;
  className?: string;
}

const LoanFormDetails = ({
  amount,
  nPer,
  annualInterestRate,
  paymentFrequency,
  className = "",
}: LoanFormDefaultProps) => {
  const details = useMemo<{ pmt: number; totalInterest: number }>(() => {
    const calculatedPmt =
      getPmt(annualInterestRate, paymentFrequency, nPer, amount) || 0;
    const totalInterest =
      getTotalInterest(calculatedPmt, paymentFrequency, amount) || 0;

    return { pmt: calculatedPmt, totalInterest: totalInterest };
  }, [annualInterestRate, amount, nPer, paymentFrequency]);

  return (
    <FinancialCard
      className={className}
      title={`Prevista del Préstamo`}
      subheading="Cuota"
      heading={toCurrency(details.pmt)}
      headers={[
        ["Monto", toCurrency(amount || 0)],
        ["Interés Anual", `${annualInterestRate * 100}%`],
        ["Interés Total Pagado", toCurrency(details.totalInterest || 0)],
      ]}
    />
  );
};

export default LoanFormDetails;
