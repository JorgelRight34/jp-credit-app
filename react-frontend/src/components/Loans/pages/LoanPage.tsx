import { Tab, Tabs } from "react-bootstrap";
import EntityLayout from "../../../common/EntityLayout";
import LoanInformation from "../components/LoanInformation";
import useLoan from "../hooks/useLoan";
import { useParams } from "react-router";

const LoanPage = () => {
  const { id } = useParams<{ id: string }>();
  const [loan] = useLoan(id || "");

  if (loan) {
    return (
      <EntityLayout title={`Loan ${loan.id}`}>
        <Tabs>
          <Tab className="tab" eventKey="info" title="Information">
            <div className="tab-content py-3">
              <LoanInformation loan={loan} />
            </div>
          </Tab>
          <Tab className="tab" eventKey="client" title="Client">
            <div className="tab-content py-3">Clients</div>
          </Tab>
          <Tab className="tab" eventKey="collaterals" title="Collaterals">
            <div className="tab-content py-3">Collaterals</div>
          </Tab>
          <Tab className="tab" eventKey="transactions" title="Transactions">
            <div className="tab-content py-3">Transactions</div>
          </Tab>
        </Tabs>
      </EntityLayout>
    );
  } else {
    return <>Loading...</>;
  }
};

export default LoanPage;
