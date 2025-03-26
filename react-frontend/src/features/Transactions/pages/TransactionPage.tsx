import { useParams } from "react-router";
import useTransaction from "../hooks/useTransaction";
import EntityLayout from "../../../common/EntityLayout";
import { Tab, Tabs } from "react-bootstrap";
import NotFound from "../../../pages/NotFound";
import ProfileInfo from "../../Profiles/components/ProfileInfo";
import LoanInformation from "../../Loans/components/LoanInformation";
import TransactionInfo from "../components/TransactionInfo";

const TransactionPage = () => {
  const { id } = useParams();
  const { transaction, error } = useTransaction(Number(id));

  if (error) return <NotFound />;

  if (!transaction) return <h1>Loading...</h1>;

  return (
    <EntityLayout title={`Transaction #${id}`}>
      <Tabs>
        <Tab eventKey={"transaction"} title="Transaction" className="p-3">
          <TransactionInfo transaction={transaction} />
        </Tab>
        <Tab eventKey={"client"} title="Client" className="p-3">
          <ProfileInfo profile={transaction.payer} />
        </Tab>
        <Tab eventKey={"loan"} title="Loan" className="p-3">
          <LoanInformation loan={transaction.loan} />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default TransactionPage;
