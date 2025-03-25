import { useParams } from "react-router";
import useTransaction from "../hooks/useTransaction";
import EntityLayout from "../../../common/EntityLayout";
import { Tab, Tabs } from "react-bootstrap";

const TransactionPage = () => {
  const { id } = useParams();
  const [transaction] = useTransaction(Number(id));

  if (transaction) {
    return (
      <EntityLayout title={`Transaction #${id}`}>
        <Tabs>
          <Tab eventKey={"transaction"} title="Transaction"></Tab>
        </Tabs>
      </EntityLayout>
    );
  }
};

export default TransactionPage;
