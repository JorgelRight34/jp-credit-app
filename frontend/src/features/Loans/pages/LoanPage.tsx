import { Tab, Tabs } from "react-bootstrap";
import EntityLayout from "../../../common/EntityLayout";
import LoanInformation from "../components/LoanInfo";
import useLoan from "../hooks/useLoan";
import { useParams } from "react-router";
import ProfileInfo from "../../Profiles/components/ProfileInfo";
import CollateralsDataTable from "../../Collaterals/components/CollateralsDataTable";
import useCollaterals from "../../Collaterals/hooks/useCollaterals";
import useTransactions from "../../Transactions/hooks/useTransactions";
import TransactionsDataTable from "../../Transactions/components/TransactionsDataTable";
import useDeleteLoan from "../hooks/useDeleteLoan";
import NotFound from "../../../pages/NotFound";
import NotesDataTable from "../../Notes/components/NotesDataTable";
import useNotes from "../../Notes/hooks/useNotes";
import { toast } from "react-toastify";

const LoanPage = () => {
  const { id } = useParams<{ id: string }>();
  const { loan, error } = useLoan(id || "");
  const [collaterals, fetchCollaterals] = useCollaterals(`loanId=${id}`);
  const [transactions, fetchTransactions] = useTransactions(`loanId=${id}`);
  const [notes, fetchNotes] = useNotes(`loanId=${id}`);
  const [onDelete] = useDeleteLoan();

  const handleOnDelete = async () => {
    const numberId = Number(id);
    if (isNaN(numberId)) toast.error("Invalid loan id");
    if (confirm("Are you sure you want to delete this record?"))
      await onDelete(numberId);
  };

  if (error) return <NotFound />;

  if (!loan) return <></>;

  return (
    <EntityLayout title={`Loan #${loan.id}`} onDelete={handleOnDelete}>
      <Tabs>
        <Tab className="p-3" eventKey="info" title="Information">
          <LoanInformation loan={loan} />
        </Tab>
        <Tab className="p-3" eventKey="client" title="Client">
          {loan.client && <ProfileInfo profile={loan.client} />}
        </Tab>
        <Tab className="p-3" eventKey="collaterals" title="Collaterals">
          <CollateralsDataTable
            collaterals={collaterals}
            navigateCallback={(page: number) => fetchCollaterals(page)}
          />
        </Tab>
        <Tab className="p-3" eventKey="transactions" title="Transactions">
          <TransactionsDataTable
            transactions={transactions}
            navigateCallback={(page: number) => fetchTransactions(page)}
          />
        </Tab>
        <Tab className="p-3" eventKey="notes" title="Notes">
          <NotesDataTable
            notes={notes}
            navigateCallback={(page: number) => fetchNotes(page)}
          />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default LoanPage;
