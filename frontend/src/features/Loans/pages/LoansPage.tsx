import EntityLayout from "../../../common/EntityLayout";
import "../loans.css";
import { Tab, Tabs } from "react-bootstrap";
import Modal from "../../../common/Modal";
import { useState } from "react";
import LoanForm from "../components/LoanForm";
import LoansDataTable from "../components/LoansDataTable";
import useLoans from "../hooks/useLoans";
import LoanSearchInput from "../components/LoanSearch";

const LoansPage = () => {
  const [loans, fetchLoans] = useLoans();
  const [isModalShowing, setIsModalShowing] = useState(false);

  const hideModal = () => setIsModalShowing(false);

  return (
    <>
      <EntityLayout title="Préstamos" onAddNew={() => setIsModalShowing(true)}>
        <Tabs>
          <Tab eventKey={"active"} title="Activos" className="p-3">
            <div className="mb-3">
              <LoanSearchInput />
            </div>
            <LoansDataTable loans={loans} navigateCallback={fetchLoans} />
          </Tab>
          <Tab eventKey={"pending"} title="Pendientes" className="p-3"></Tab>
        </Tabs>
      </EntityLayout>
      <Modal show={isModalShowing} onHide={hideModal} title="Add New Loan">
        <LoanForm />
      </Modal>
    </>
  );
};

export default LoansPage;
