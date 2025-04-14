import EntityLayout from "../../../common/EntityLayout";
import "../loans.css";
import { Tab, Tabs } from "react-bootstrap";
import Modal from "../../../common/Modal";
import { useMemo, useState } from "react";
import LoanForm from "../components/LoanForm";
import LoansDataTable from "../components/LoansDataTable";
import useLoans from "../hooks/useLoans";
import LoanSearchInput from "../components/LoanSearch";
import { LoanStatus } from "../../../models/loanStatus";

const LoansPage = () => {
  const [loans, fetchLoans] = useLoans();
  const [isModalShowing, setIsModalShowing] = useState(false);

  const hideModal = () => setIsModalShowing(false);

  const activeLoans = useMemo(
    () =>
      loans.filter((loan) => loan.status.toLowerCase() === LoanStatus.Active),
    [loans]
  );
  const inactiveLoans = useMemo(
    () =>
      loans.filter((loan) => loan.status.toLowerCase() !== LoanStatus.Active),
    [loans]
  );

  return (
    <>
      <EntityLayout title="Préstamos" onAddNew={() => setIsModalShowing(true)}>
        <Tabs>
          <Tab eventKey={"active"} title="Activos" className="p-3">
            <div className="mb-3">
              <LoanSearchInput />
            </div>
            <LoansDataTable loans={activeLoans} navigateCallback={fetchLoans} />
          </Tab>
          <Tab eventKey={"pending"} title="Pendientes" className="p-3">
            <div className="mb-3">
              <LoanSearchInput />
            </div>
            <LoansDataTable
              loans={inactiveLoans}
              navigateCallback={fetchLoans}
            />
          </Tab>
        </Tabs>
      </EntityLayout>
      <Modal show={isModalShowing} onHide={hideModal} title="Add New Loan">
        <LoanForm />
      </Modal>
    </>
  );
};

export default LoansPage;
