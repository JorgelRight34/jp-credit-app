import { Tab, Tabs } from "react-bootstrap";
import EntityLayout from "../../../layouts/EntityLayout";
import LoanInformation from "../components/LoanInfo";
import useLoan from "../hooks/useLoan";
import { useParams } from "react-router";
import ProfileInfo from "../../Profiles/components/ProfileInfo";
import CollateralsDataTable from "../../Collaterals/components/CollateralsDataTable";
import useCollaterals from "../../Collaterals/hooks/useCollaterals";
import useTransactions from "../../Transactions/hooks/useTransactions";
import TransactionsDataTable from "../../Transactions/components/TransactionsDataTable";
import useDeleteLoan from "../hooks/useDeleteLoan";
import NotFound from "../../../pages/NotFound";
import NotesDataTable from "../../Notes/components/NotesDataTable";
import useNotes from "../../Notes/hooks/useNotes";
import { toast } from "react-toastify";
import { useState } from "react";
import Modal from "../../../common/ui/Modal";
import LoanForm from "../components/LoanForm";
import AccentBtn from "../../../common/ui/AccentBtn";
import TransactionForm from "../../Transactions/components/TransactionForm";
import TabTitle from "../../../common/TabTitle";
import ArmotizationDataTable from "../../Armotizations/components/ArmotizationDataTable";
import useLoanArmotization from "../../Armotizations/hooks/useLoanArmotization";

const LoanPage = () => {
  const { id } = useParams<{ id: string }>();
  const { loan, isError, isLoading } = useLoan(id || "");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const { collaterals, fetchPage: fetchCollateralPage } = useCollaterals(
    `loanId=${id}`
  );
  const { transactions, fetchPage: fetchTransactions } = useTransactions();
  const { notes, fetchPage: fetchNotes } = useNotes(`loanId=${id}`);
  const { armotization } = useLoanArmotization(Number(id));
  const [onDelete] = useDeleteLoan();

  const handleOnDelete = async () => {
    const numberId = Number(id);
    if (isNaN(numberId)) toast.error("Invalid loan id");
    if (confirm("Are you sure you want to delete this record?"))
      await onDelete(numberId);
  };

  if (isError) return <NotFound />;

  if (isLoading) return <>...</>;

  return (
    <>
      <EntityLayout
        title={`Préstamo #${loan.id}`}
        extraOption={
          <AccentBtn onClick={() => setShowTransactionModal(true)}>
            Hacer Pago
          </AccentBtn>
        }
        onDelete={handleOnDelete}
        onEdit={() => setShowEditModal(true)}
      >
        <Tabs>
          <Tab className="p-3" eventKey="info" title="Información">
            <LoanInformation loan={loan} />
          </Tab>
          <Tab className="p-3" eventKey="collaterals" title="Garantías">
            <CollateralsDataTable
              collaterals={collaterals}
              navigateCallback={(page: number) =>
                fetchCollateralPage(page, `loanId=${id}`)
              }
            />
          </Tab>
          <Tab className="p-3" eventKey="transactions" title="Transacciones">
            <TransactionsDataTable
              transactions={transactions}
              navigateCallback={(page: number) => fetchTransactions(page)}
            />
          </Tab>
          <Tab className="p-3" eventKey="notes" title="Notas">
            <NotesDataTable
              notes={notes}
              navigateCallback={(page: number) => fetchNotes(page)}
            />
          </Tab>
          <Tab className="p-3" eventKey="armotization" title="Armotización">
            <ArmotizationDataTable armotization={armotization} />
          </Tab>
          <Tab
            className="p-3"
            eventKey="client"
            title={
              <TabTitle
                title="Cliente"
                path={`/profiles/${loan.client.username}`}
              />
            }
          >
            {loan.client && <ProfileInfo profile={loan.client} />}
          </Tab>
          <Tab
            className="p-3"
            eventKey="loanOfficer"
            title={
              <TabTitle
                title="Agente"
                path={`/profiles/${loan.loanOfficer.username}`}
              />
            }
          >
            {loan.loanOfficer && <ProfileInfo profile={loan.loanOfficer} />}
          </Tab>
          <Tab
            className="p-3"
            eventKey="guarantor"
            title={
              <TabTitle
                title="Garante"
                path={`/profiles/${loan.guarantor.username}`}
              />
            }
          >
            {loan.guarantor && <ProfileInfo profile={loan.guarantor} />}
          </Tab>
        </Tabs>
      </EntityLayout>
      <Modal
        title="Editar Préstamo"
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
      >
        <LoanForm
          edit={loan}
          defaultValues={{
            ...loan,
            description: loan.description || "",
            loanOfficerId: loan.loanOfficer?.id || "",
            clientId: loan.client.id,
            guarantorId: loan.guarantorId || "",
            status: loan.status.toLowerCase(),
          }}
        />
      </Modal>
      <Modal
        title="Hacer Pago"
        show={showTransactionModal}
        onHide={() => setShowTransactionModal(false)}
      >
        <TransactionForm fixedLoan={loan} />
      </Modal>
    </>
  );
};

export default LoanPage;
