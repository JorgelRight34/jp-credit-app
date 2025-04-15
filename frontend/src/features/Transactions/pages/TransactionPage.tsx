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
    if (confirm("¿Seguro deseas borrar este registro?") && id) {
      onDelete(id).then(() => navigate("/transactions"));
    }
  };
  if (error) return <NotFound />;

  if (!transaction) return <></>;

  return (
    <EntityLayout title={`Transacción #${id}`} onDelete={handleOnDelete}>
      <Tabs>
        <Tab eventKey={"transaction"} title="Transacción" className="p-3">
          <TransactionInfo transaction={transaction} />
        </Tab>
        <Tab eventKey={"client"} title="Cliente" className="p-3">
          <ProfileInfo profile={transaction.payer} />
        </Tab>
        <Tab eventKey={"loan"} title="Préstamo" className="p-3">
          <LoanInfo loan={transaction.loan} />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default TransactionPage;
