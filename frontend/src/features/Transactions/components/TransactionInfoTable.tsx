import InfoTable from "../../../common/DataTable/InfoTable";
import { Transaction } from "../../../models/transaction";
import { toCurrency, toFormattedDate } from "../../../utils/utils";
import LinkToProfile from "../../Profiles/components/LinkToProfile";
import { transactionTypesFullNames } from "../../../utils/constants";
import { TransactionType } from "../../../models/transactionType";
import LinkToLoan from "../../Loans/components/LinkToLoan";

interface TransactionInfoTable {
  transaction: Transaction;
}

const TransactionInfoTable = ({ transaction }: TransactionInfoTable) => {
  return (
    <InfoTable
      data={[
        ["Id", transaction.id],
        ["Préstamo", <LinkToLoan loan={transaction.loan} />],
        [
          "Cliente",
          <LinkToProfile profile={transaction.payer} fullName={true} />,
        ],
        ["Capital", toCurrency(transaction.capitalValue)],
        ["Intereses", toCurrency(transaction.interestValue)],
        [
          "Tipo",
          transactionTypesFullNames[
            transaction.type.toUpperCase() as TransactionType
          ],
        ],
        ["Mora", toCurrency(transaction.delinquency)],
        ["Fecha", toFormattedDate(transaction.date)],
      ]}
    />
  );
};

export default TransactionInfoTable;
