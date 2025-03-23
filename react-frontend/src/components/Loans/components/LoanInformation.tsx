import { ReactNode } from "react";
import { Loan } from "../../../models/loan";

interface LoanInformationProps {
  loan: Loan;
}

const LoanInformation = ({ loan }: LoanInformationProps) => {
  return (
    <ul>
      {Object.keys(loan).map((key: string) => (
        <p key={key}>
          <b>{key}</b>:{" "}
          <span>{loan[key as keyof Loan]?.toString() as ReactNode}</span>
        </p>
      ))}
    </ul>
  );
};

export default LoanInformation;
