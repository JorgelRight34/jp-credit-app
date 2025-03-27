import DataTable from "../../../common/DataTable";
import { Loan } from "../../../models/loan";
import LoanDataRow from "./LoanDataRow";

interface LoansDataTable {
  loans: Loan[];
}

const LoansDataTable = ({ loans }: LoansDataTable) => {
  const headers = [
    "Id",
    "Client",
    "Approved",
    "Disbursed",
    "Principal",
    "Interests",
    "Payments",
    "Interest Rate",
    "Date",
  ];

  return (
    <DataTable headers={headers}>
      {loans.map((loan) => (
        <LoanDataRow loan={loan} key={loan.id} />
      ))}
    </DataTable>
  );
};

export default LoansDataTable;
