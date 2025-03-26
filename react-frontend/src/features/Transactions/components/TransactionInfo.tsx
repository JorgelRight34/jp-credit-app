import { Transaction } from "../../../models/transaction";

interface TransactionInfoProps {
  transaction: Transaction;
}

const TransactionInfo = ({ transaction }: TransactionInfoProps) => {
  return <>Info {transaction.id}</>;
};

export default TransactionInfo;
