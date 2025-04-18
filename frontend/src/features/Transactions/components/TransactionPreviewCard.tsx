import { Transaction } from "../../../models/transaction";
import { toCurrency } from "../../../utils/utils";

interface TransactionPreviewCardProps {
  title: string;
  transaction?: Transaction;
  className: string;
}

const TransactionPreviewCard = ({
  title = "",
  transaction,
  className,
}: TransactionPreviewCardProps) => {
  return (
    <div className={`border rounded-lg shadow-sm ${className}`}>
      <div className="flex justify-between border-bottom p-3">
        <h6 className="mb-0">{title}</h6>
        <span className="text-muted">
          {transaction ? `#${transaction?.id}` : ""}
        </span>
      </div>
      <div className="flex justify-between p-3">
        <span>Activo</span>
        <span>
          {transaction
            ? toCurrency(transaction.capitalValue + transaction.interestValue)
            : "---"}
        </span>
      </div>
    </div>
  );
};

export default TransactionPreviewCard;
