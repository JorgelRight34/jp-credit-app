import { useNavigate } from "react-router";
import { Transaction } from "../../../models/transaction";
import { toCurrency } from "../../../utils/utils";

interface TransactionDataRowProps {
  transaction: Transaction;
}

const TransactionDataRow = ({ transaction }: TransactionDataRowProps) => {
  const navigate = useNavigate();

  return (
    <tr onClick={() => navigate(`/transactions/${transaction.id}`)}>
      <td>{transaction.id}</td>
      <td>{toCurrency(transaction.capitalValue)}</td>
      <td>{toCurrency(transaction.interestValue)}</td>
      <td>{toCurrency(transaction.delinquency)}</td>
      <td>{transaction.loanId}</td>
      <td>
        {transaction.payer.firstName} {transaction.payer.lastName}
      </td>
    </tr>
  );
};

export default TransactionDataRow;
