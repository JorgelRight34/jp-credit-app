import { Transaction } from "../../../models/transaction";
import LoanPreviewCard from "../../Loans/components/LoanPreviewCard";
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
        <div className="col-lg-6 flex flex-col align-center">
          <div>
            <h4>Historial</h4>
            <LoanPreviewCard className="mb-3" loan={transaction.loan} />
            <TransactionPreviewCard
              title="Ultima Transacción"
              className="mb-3"
              transaction={stats?.lastTransaction}
            />
            <TransactionPreviewCard
              title="Próxima Transacción"
              transaction={stats?.nextTransaction}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <h4>Detalles</h4>
          <TransactionInfoTable transaction={transaction} />
        </div>
      </div>
    </>
  );
};

export default TransactionInfo;
