import DataTable from "../../../common/DataTable";
import EntityLayout from "../../../common/EntityLayout";
import LoanOfficerDataRow from "../components/LoanOfficerDataRow";
import useLoanOfficers from "../hooks/useLoanOfficers";

const LoanOfficersPage = () => {
  const [loanOfficers] = useLoanOfficers();
  const headers = ["Id", "First Name", "Last Name", "Gender"];

  return (
    <EntityLayout title="Loan Officers">
      <DataTable headers={headers}>
        {loanOfficers?.map((loanOfficer) => (
          <LoanOfficerDataRow key={loanOfficer.id} loanOfficer={loanOfficer} />
        ))}
      </DataTable>
    </EntityLayout>
  );
};

export default LoanOfficersPage;
