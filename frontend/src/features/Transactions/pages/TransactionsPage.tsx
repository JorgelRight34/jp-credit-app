import { Tab, Tabs } from "react-bootstrap";
import EntityLayout from "../../../layouts/EntityLayout";
import useTransactions from "../hooks/useTransactions";
import TransactionsDataTable from "../components/TransactionsDataTable";
import Modal from "../../../common/ui/Modal";
import { useState } from "react";
import TransactionForm from "../components/TransactionForm";

const TransactionsPage = () => {
  const { transactions, fetchPage } = useTransactions();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <EntityLayout title="Transacciones" onAddNew={() => setShowModal(true)}>
        <Tabs>
          <Tab eventKey="transactions" title="Transacciones" className="p-3">
            <TransactionsDataTable
              transactions={transactions}
              navigateCallback={(page: number) => fetchPage(page)}
            />
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
