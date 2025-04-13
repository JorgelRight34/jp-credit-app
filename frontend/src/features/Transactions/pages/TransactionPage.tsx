import { useNavigate, useParams } from "react-router";
import useTransaction from "../hooks/useTransaction";
import EntityLayout from "../../../common/EntityLayout";
import { Tab, Tabs } from "react-bootstrap";
import NotFound from "../../../pages/NotFound";
import ProfileInfo from "../../Profiles/components/ProfileInfo";
import LoanInfo from "../../Loans/components/LoanInfo";
import TransactionInfo from "../components/TransactionInfo";
import useDeleteTransaction from "../hooks/useDeleteTransaction";

const TransactionPage = () => {
  const { id } = useParams();
  const { transaction, error } = useTransaction(Number(id));
  const [onDelete] = useDeleteTransaction();
  const navigate = useNavigate();

  const handleOnDelete = () => {
    if (confirm("Are you sure you want to delete this record?") && id) {
      onDelete(id).then(() => navigate("/transactions"));
    }
  };
  if (error) return <NotFound />;

  if (!transaction) return <></>;

  return (
    <EntityLayout title={`Transaction #${id}`} onDelete={handleOnDelete}>
      <Tabs>
        <Tab eventKey={"transaction"} title="Transaction" className="p-3">
          <TransactionInfo transaction={transaction} />
        </Tab>
        <Tab eventKey={"client"} title="Client" className="p-3">
          <ProfileInfo profile={transaction.payer} />
        </Tab>
        <Tab eventKey={"loan"} title="Loan" className="p-3">
          <LoanInfo loan={transaction.loan} />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default TransactionPage;
