import { Tab, Tabs } from "react-bootstrap";
import EntityLayout from "../../../common/EntityLayout";
import ClientInfo from "../components/ClientInfo";
import useClient from "../hooks/useClient";
import { useParams } from "react-router";
import LoansDataTable from "../../Loans/components/LoansDataTable";
import useLoans from "../../Loans/hooks/useLoans";

const ClientPage = () => {
  const { username } = useParams();
  const [client] = useClient(username || "");
  const [userLoans] = useLoans(`clientId=${client?.id}`);

  if (client)
    return (
      <EntityLayout title="Client">
        <Tabs>
          <Tab eventKey={"info"} title="Information" className="p-3">
            {client && <ClientInfo client={client} />}
          </Tab>
          <Tab eventKey={"loans"} title="Loans" className="p-3">
            <LoansDataTable loans={userLoans} />
          </Tab>
          <Tab
            eventKey={"collaterals"}
            title="Collaterals"
            className="p-3"
          ></Tab>
          <Tab
            eventKey={"transactions"}
            title="Transactions"
            className="p-3"
          ></Tab>
        </Tabs>
      </EntityLayout>
    );
};

export default ClientPage;
