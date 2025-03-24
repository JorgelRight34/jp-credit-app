import { User } from "../../../models/user";

interface LoanOfficerDataRow {
  loanOfficer: User;
}

const LoanOfficerDataRow = ({ loanOfficer }: LoanOfficerDataRow) => {
  return (
    <tr>
      <td>{loanOfficer.id}</td>
      <td>{loanOfficer.firstName}</td>
      <td>{loanOfficer.lastName}</td>
      <td>{loanOfficer.gender}</td>
    </tr>
  );
};

export default LoanOfficerDataRow;
