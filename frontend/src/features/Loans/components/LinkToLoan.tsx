import { ReactNode } from "react";
import AppLink from "../../../common/ui/AppLink";
import { Loan } from "../../../models/loan";

interface LinkToLoanProps {
  loan?: Loan;
  id?: number | string;
  fullName?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  children?: ReactNode;
}

const LinkToLoan = ({ loan, children, id, onClick }: LinkToLoanProps) => {
  return (
    <AppLink to={`/loans/${loan?.id || id}`} onClick={onClick}>
      {children ? children : `#${loan?.id || id}`}
    </AppLink>
  );
};

export default LinkToLoan;
