import DataTable from "../../../common/DataTable";
import { Loan } from "../../../models/loan";
import LoanDataRow from "./LoanDataRow";

interface LoansDataTable {
  loans: Loan[];
  navigateCallback?: (page: number) => void;
}

const LoansDataTable = ({ loans, navigateCallback }: LoansDataTable) => {
  const headers = [
    "Id",
    "Client",
    "Approved",
    "Disbursed",
    "Principal",
    "Interests",
    "Last Payment",
    "Interest Rate",
    "Date",
  ];

  return (
    <DataTable headers={headers} callback={navigateCallback}>
      {loans.map((loan) => (
        <LoanDataRow loan={loan} key={loan.id} />
      ))}
    </DataTable>
  );
};

export default LoansDataTable;
