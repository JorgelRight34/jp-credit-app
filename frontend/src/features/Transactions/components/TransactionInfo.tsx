import { Transaction } from "../../../models/transaction";
import useTransactionStats from "../hooks/useTransactionStats";
import TransactionInfoTable from "./TransactionInfoTable";
import TransactionPreviewCard from "./TransactionPreviewCard";

interface TransactionInfoProps {
  transaction: Transaction;
}

const TransactionInfo = ({ transaction }: TransactionInfoProps) => {
  const { stats } = useTransactionStats(transaction.id);

  return (
    <>
      <div className="row mx-0">
        <div className="col-lg-4">
          <TransactionPreviewCard
            title="Ultima Transacción"
            className="mb-3"
            transaction={stats?.lastTransaction}
          />
          <TransactionPreviewCard
            title="Próxima Transacción"
            className="mb-3"
            transaction={stats?.nextTransaction}
          />
        </div>
        <div className="col-lg-8">
          <TransactionInfoTable transaction={transaction} />
        </div>
      </div>
    </>
  );
};

export default TransactionInfo;
