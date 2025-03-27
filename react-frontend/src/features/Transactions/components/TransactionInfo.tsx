import InfoTable from "../../../common/InfoTable";
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
          ["Id", transaction.id, "Loan", transaction.loanId],
          ["Client", getFullName(transaction.payer), "", ""],
          [
            "Capital",
            toCurrency(transaction.capitalValue),
            "Interests",
            toCurrency(transaction.interestValue),
          ],
          [
            "Delinquency",
            toCurrency(transaction.delinquency),
            "Date",
            toFormattedDate(new Date(transaction.date)),
          ],
        ]}
      />
    </>
  );
};

export default TransactionInfo;
