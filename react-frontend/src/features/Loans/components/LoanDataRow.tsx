import { useNavigate } from "react-router";
import { Loan } from "../../../models/loan";
import { toCurrency, toFormattedDate } from "../../../utils/utils";

interface LoanDataRowProps {
  loan: Loan;
}

const LoanDataRow = ({ loan }: LoanDataRowProps) => {
  const navigate = useNavigate();

  return (
    <tr className="text-muted" onClick={() => navigate(`/loans/${loan.id}`)}>
      <td>{loan.id}</td>
      <td>{toCurrency(loan.approvedAmount)}</td>
      <td>{toCurrency(loan.disbursedAmount)}</td>
      <td>{toCurrency(loan.principalBalance)}</td>
      <td className="text-success">{toCurrency(loan.accruedInterest)}</td>
      <td>{loan.numberOfPayments}</td>
      <td>{loan.annualInterestRate}</td>
      <td>{toFormattedDate(new Date(loan.createdAt))}</td>
    </tr>
  );
};

export default LoanDataRow;
