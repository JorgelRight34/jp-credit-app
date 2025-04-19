import { Loan } from "../../../models/loan";
import LoanInfoTable from "./LoanInfoTable";

interface LoanInfoProps {
  loan: Loan;
}

/**
 * Displays loan details in a structured layout with description and info table.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Loan} props.loan - Loan data object
 * @returns {React.ReactElement} Loan information display component
 *
 * @example
 * <LoanInfo loan={loanData} />
 */
const LoanInfo = ({ loan }: LoanInfoProps) => {
  return (
    <div className="row mx-0">
      <div>
        <LoanInfoTable loan={loan} />
      </div>
      <div className="mt-3">
        <h4>Descripción</h4>
        <p>{loan.description ? loan.description : "Sin descripción"}</p>
      </div>
    </div>
  );
};

export default LoanInfo;
