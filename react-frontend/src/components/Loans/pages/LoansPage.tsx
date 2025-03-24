import useLoans from "../hooks/useLoans";
import EntityLayout from "../../../common/EntityLayout";
import "../loans.css";
import DataTable from "../../../common/DataTable";
import { Tab, Tabs } from "react-bootstrap";
import LoanDataRow from "../components/LoanDataRow";
import Modal from "../../../common/Modal";
import { useState } from "react";
import LoanForm from "../components/LoanForm";

const LoansPage = () => {
  const [loans] = useLoans();
  const [isModalShowing, setIsModalShowing] = useState(false);

  const hideModal = () => setIsModalShowing(false);

  const headers = [
    "Id",
    "Approved",
    "Disbursed",
    "Principal",
    "Interests",
    "Payments",
    "Date",
  ];

  return (
    <>
      <EntityLayout title="Loans" onAddNew={() => setIsModalShowing(true)}>
        <Tabs>
          <Tab eventKey={"active"} title="Active">
            <div className="p-3">
              <DataTable headers={headers}>
                {loans.map((loan) => (
                  <LoanDataRow loan={loan} key={loan.id} />
                ))}
              </DataTable>
            </div>
          </Tab>
          <Tab eventKey={"pending"} title="Pending">
            <div className="p-3">
              <DataTable headers={headers}>
                {loans.map((loan) => (
                  <LoanDataRow loan={loan} key={loan.id} />
                ))}
              </DataTable>
            </div>
          </Tab>
        </Tabs>
      </EntityLayout>
      <Modal show={isModalShowing} onHide={hideModal} title="Add new loan">
        <LoanForm />
      </Modal>
    </>
  );
};

export default LoansPage;
