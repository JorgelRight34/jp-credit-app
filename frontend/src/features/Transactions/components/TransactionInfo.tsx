import InfoTable from "../../../common/DataTable/InfoTable";
import { Transaction } from "../../../models/transaction";
import { getFullName, toCurrency, toFormattedDate } from "../../../utils/utils";

interface TransactionInfoProps {
  transaction: Transaction;
}

const TransactionInfo = ({ transaction }: TransactionInfoProps) => {
  return (
    <>
      <InfoTable
        data={[
          ["Id", transaction.id, "Préstamo", transaction.loanId],
          ["Cliente", getFullName(transaction.payer), "", ""],
          [
            "Capital",
            toCurrency(transaction.capitalValue),
            "Intereses",
            toCurrency(transaction.interestValue),
          ],
          [
            "Mora",
            toCurrency(transaction.delinquency),
            "Fecha",
            toFormattedDate(new Date(transaction.date)),
          ],
        ]}
      />
    </>
  );
};

export default TransactionInfo;
