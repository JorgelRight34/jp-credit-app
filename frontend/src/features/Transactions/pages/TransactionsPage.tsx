import { Tab, Tabs } from "react-bootstrap";
import EntityLayout from "../../../layouts/EntityLayout";
import useTransactions from "../hooks/useTransactions";
import TransactionsDataTable from "../components/TransactionsDataTable";
import Modal from "../../../common/ui/Modal";
import { useState } from "react";
import TransactionForm from "../components/TransactionForm";
import IncomesDataTable from "../components/IncomesDataTable";
import OutcomesDataTable from "../components/OutcomesDataTable";
import FeesDataTable from "../components/FeesDataTable";

const TransactionsPage = () => {
  const { transactions, fetchPage } = useTransactions();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <EntityLayout title="Transacciones" onAddNew={() => setShowModal(true)}>
        <Tabs defaultActiveKey="all">
          <Tab eventKey="all" title="Transacciones" className="p-3">
            <TransactionsDataTable
              transactions={transactions}
              navigateCallback={(page: number) => fetchPage(page)}
            />
          </Tab>
          <Tab eventKey="incomes" className="p-3" title="Ingresos">
            <IncomesDataTable />
          </Tab>
          <Tab eventKey="outcomes" className="p-3" title="Egresos">
            <OutcomesDataTable />
          </Tab>
          <Tab eventKey="cuotas" className="p-3" title="Cuotas">
            <FeesDataTable />
          </Tab>
        </Tabs>
      </EntityLayout>
      <Modal
        title="Añadir Transacción"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <TransactionForm />
      </Modal>
    </>
  );
};

export default TransactionsPage;
