import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Transaction } from "../../../models/transaction";
import { toCurrency, toFormattedDate } from "../../../utils/utils";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import AppLink from "../../../common/ui/AppLink";

interface TransactionPreviewCardProps {
  title: string;
  transaction?: Transaction;
  nextTransactionDate?: string;
  className?: string;
}

const TransactionPreviewCard = ({
  title = "",
  transaction,
  nextTransactionDate,
  className,
}: TransactionPreviewCardProps) => {
  return (
    <div className={`border rounded-lg shadow-sm ${className}`}>
      <div className="flex justify-between border-bottom p-3">
        <div className="flex items-center">
          <h6 className="mb-0">{title}</h6>
          {transaction && (
            <AppLink className="ms-2" to={`/transactions/${transaction.id}`}>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </AppLink>
          )}
        </div>
        <span className="text-muted">
          {transaction
            ? toFormattedDate(transaction.date)
            : nextTransactionDate
            ? toFormattedDate(nextTransactionDate)
            : "---"}
        </span>
      </div>
      <div className="flex justify-between p-3">
        <div className="flex flex-col">
          <b>Capital</b>
          <span className="text-muted">
            {transaction ? toCurrency(transaction.capitalValue) : "---"}
          </span>
        </div>
        <div className="flex flex-col">
          <b>Intereses</b>
          <span className="text-muted">
            {transaction ? toCurrency(transaction.interestValue) : "---"}
          </span>
        </div>
        <div className="flex flex-col">
          <b>Total</b>
          <span className="text-muted">
            {transaction
              ? toCurrency(transaction.capitalValue + transaction.interestValue)
              : "---"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionPreviewCard;
