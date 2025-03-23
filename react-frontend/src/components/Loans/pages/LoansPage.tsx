import useLoans from "../hooks/useLoans";
import { toCurrency, toFormattedDate } from "../../../utils/utils";
import { useNavigate } from "react-router";
import EntityLayout from "../../../common/EntityLayout";
import "../loans.css";
import DataTable from "../../../common/DataTable";

const LoansPage = () => {
  const [loans] = useLoans();
  const navigate = useNavigate();

  const headers = [
    "Id",
    "Approved",
    "Disbursed",
    "Principal",
    "Interests",
    "Payments",
    "Date",
  ];

  return (
    <EntityLayout>
      <DataTable headers={headers}>
        {loans.map((loan) => (
          <tr key={loan.id} onClick={() => navigate(`${loan.id}`)}>
            <td>{loan.id}</td>
            <td>{toCurrency(loan.approvedAmount)}</td>
            <td>{toCurrency(loan.disbursedAmount)}</td>
            <td>{toCurrency(loan.principalBalance)}</td>
            <td className="text-success">{toCurrency(loan.accruedInterest)}</td>
            <td>{loan.numberOfPayments}</td>
            <td>{toFormattedDate(loan.createdAt)}</td>
          </tr>
        ))}
      </DataTable>
    </EntityLayout>
  );
};

export default LoansPage;
