import { Tab, Tabs } from "react-bootstrap";
import EntityLayout from "../../../common/EntityLayout";
import LoanInformation from "../components/LoanInformation";
import useLoan from "../hooks/useLoan";
import { useNavigate, useParams } from "react-router";
import ProfileInfo from "../../Profiles/components/ProfileInfo";
import CollateralsDataTable from "../../Collaterals/components/CollateralsDataTable";
import useCollaterals from "../../Collaterals/hooks/useCollaterals";
import useTransactions from "../../Transactions/hooks/useTransactions";
import TransactionsDataTable from "../../Transactions/components/TransactionsDataTable";
import useDeleteLoan from "../hooks/useDeleteLoan";

const LoanPage = () => {
  const { id } = useParams<{ id: string }>();
  const [loan] = useLoan(id || "");
  const [collaterals] = useCollaterals(`loanId=${id}`);
  const [transactions] = useTransactions(`loanId=${id}`);
  const [deleteLoan] = useDeleteLoan(id || "");
  const navigate = useNavigate();

  const handleOnDeleteLoan = () => {
    if (confirm("Are you sure you want to delete this record?")) {
      deleteLoan();
      navigate("/loans");
    }
  };

  if (loan) {
    return (
      <EntityLayout title={`Loan #${loan.id}`} onDelete={handleOnDeleteLoan}>
        <Tabs>
          <Tab className="p-3" eventKey="info" title="Information">
            <LoanInformation loan={loan} />
          </Tab>
          <Tab className="p-3" eventKey="client" title="Client">
            {loan.client && <ProfileInfo profile={loan.client} />}
          </Tab>
          <Tab className="p-3" eventKey="collaterals" title="Collaterals">
            <CollateralsDataTable collaterals={collaterals} />
          </Tab>
          <Tab className="p-3" eventKey="transactions" title="Transactions">
            <TransactionsDataTable transactions={transactions} />
          </Tab>
        </Tabs>
      </EntityLayout>
    );
  } else {
    return <>Loading...</>;
  }
};

export default LoanPage;
