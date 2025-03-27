import { NavLink, useNavigate } from "react-router";
import { Loan } from "../../../models/loan";
import { getFullName, toCurrency, toFormattedDate } from "../../../utils/utils";
import React from "react";

interface LoanDataRowProps {
  loan: Loan;
}

const LoanDataRow = ({ loan }: LoanDataRowProps) => {
  const navigate = useNavigate();

  return (
    <tr
      className="text-muted"
      onClick={(event: React.MouseEvent<HTMLTableRowElement>) => {
        event.stopPropagation();
        navigate(`/loans/${loan.id}`);
      }}
    >
      <td>{loan.id}</td>
      <td>
        <NavLink
          to={`/profiles/${loan.client?.username}`}
          onClick={(event) => event.stopPropagation()}
        >
          {getFullName(loan.client)}
        </NavLink>
      </td>
      <td>{toCurrency(loan.approvedAmount)}</td>
      <td>{toCurrency(loan.disbursedAmount)}</td>
      <td>{toCurrency(loan.principalBalance)}</td>
      <td className="text-success">{toCurrency(loan.accruedInterest)}</td>
      <td>{loan.numberOfPayments}</td>
      <td>{loan.annualInterestRate * 100 + "%"}</td>
      <td>{toFormattedDate(new Date(loan.createdAt))}</td>
    </tr>
  );
};

export default LoanDataRow;
