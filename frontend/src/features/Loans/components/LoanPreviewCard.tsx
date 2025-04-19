import { Loan } from "../../../models/loan";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppLink from "../../../common/ui/AppLink";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { toFormattedDate } from "../../../utils/utils";

interface LoanPreviewCardProps {
  loan: Loan;
  className?: string;
}

const LoanPreviewCard = ({ loan, className = "" }: LoanPreviewCardProps) => {
  return (
    <div className={`border rounded-lg ${className}`}>
      <div className="p-3 border-bottom flex justify-between">
        <div className="flex items-center">
          <h6 className="mb-0">Préstamo #{loan.id}</h6>
          <AppLink className="ms-2" to={`/loans/${loan.id}`}>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </AppLink>
        </div>
        <span className="text-muted">{toFormattedDate(loan.startDate)}</span>
      </div>
      <div className="flex justify-between p-3">
        <div className="flex flex-col">
          <b>Pago</b>
          <span className="text-muted">{loan.paymentValue}</span>
        </div>
        <div className="flex flex-col">
          <b>Intereses</b>
          <span className="text-muted">{loan.accruedInterest}</span>
        </div>
        <div className="flex flex-col">
          <b>Capital</b>
          <span className="text-muted">{loan.disbursedAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default LoanPreviewCard;
