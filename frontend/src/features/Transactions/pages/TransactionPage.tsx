import { useNavigate, useParams } from "react-router";
import useTransaction from "../hooks/useTransaction";
import EntityLayout from "../../../layouts/EntityLayout";
import { Tab, Tabs } from "react-bootstrap";
import NotFound from "../../../pages/NotFound";
import ProfileInfo from "../../Profiles/components/ProfileInfo";
import LoanInfo from "../../Loans/components/LoanInfo";
import TransactionInfo from "../components/TransactionInfo";
import useDeleteTransaction from "../hooks/useDeleteTransaction";
import TabTitle from "../../../common/TabTitle";

const TransactionPage = () => {
  const { id } = useParams();
  const { transaction, isError, isLoading } = useTransaction(Number(id));
  const [onDelete] = useDeleteTransaction();
  const navigate = useNavigate();

  const handleOnDelete = () => {
    if (confirm("¿Seguro deseas borrar este registro?") && id) {
      onDelete(id).then(() => navigate("/transactions"));
    }
  };
  if (isError) return <NotFound />;

  if (isLoading) return <></>;

  return (
    <EntityLayout title={`Transacción #${id}`} onDelete={handleOnDelete}>
      <Tabs>
        <Tab eventKey={"transaction"} title="Transacción" className="p-3">
          <TransactionInfo transaction={transaction} />
        </Tab>
        <Tab
          eventKey={"client"}
          title={
            <TabTitle
              title="Cliente"
              path={`/profiles/${transaction.payer.username}`}
            />
          }
          className="p-3"
        >
          <ProfileInfo profile={transaction.payer} />
        </Tab>
        <Tab
          eventKey={"loan"}
          title={
            <TabTitle title="Préstamo" path={`/loans/${transaction.loan.id}`} />
          }
          className="p-3"
        >
          <LoanInfo loan={transaction.loan} />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default TransactionPage;
