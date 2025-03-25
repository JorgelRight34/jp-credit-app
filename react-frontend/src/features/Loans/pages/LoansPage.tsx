import EntityLayout from "../../../common/EntityLayout";
import "../loans.css";
import { Tab, Tabs } from "react-bootstrap";
import Modal from "../../../common/Modal";
import { useState } from "react";
import LoanForm from "../components/LoanForm";
import LoansDataTable from "../components/LoansDataTable";
import useLoans from "../hooks/useLoans";

const LoansPage = () => {
  const [loans] = useLoans();
  const [isModalShowing, setIsModalShowing] = useState(false);

  const hideModal = () => setIsModalShowing(false);

  return (
    <>
      <EntityLayout title="Loans" onAddNew={() => setIsModalShowing(true)}>
        <Tabs>
          <Tab eventKey={"active"} title="Active" className="p-3">
            <LoansDataTable loans={loans} />
          </Tab>
          <Tab eventKey={"pending"} title="Pending" className="p-3"></Tab>
        </Tabs>
      </EntityLayout>
      <Modal show={isModalShowing} onHide={hideModal} title="Add new loan">
        <LoanForm />
      </Modal>
    </>
  );
};

export default LoansPage;
