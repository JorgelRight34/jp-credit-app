import { Tab, Tabs } from "react-bootstrap";
import EntityLayout from "../../../layouts/EntityLayout";
import ProfileInfo from "../components/ProfileInfo";
import { useParams } from "react-router";
import LoansDataTable from "../../Loans/components/LoansDataTable";
import useLoans from "../../Loans/hooks/useLoans";
import Modal from "../../../common/ui/Modal";
import useProfile from "../hooks/useProfile";
import CollateralsDataTable from "../../Collaterals/components/CollateralsDataTable";
import useCollaterals from "../../Collaterals/hooks/useCollaterals";
import useTransactions from "../../Transactions/hooks/useTransactions";
import TransactionsDataTable from "../../Transactions/components/TransactionsDataTable";
import { useState } from "react";
import NotFound from "../../../pages/NotFound";
import ProfileForm from "../components/ProfileForm";
import { Role } from "../../../models/role";
import { getFullName } from "../../../utils/utils";
import LoanSearchInput from "../../Loans/components/LoanSearch";

const ProfilePage = () => {
  const { username } = useParams();
  const { profile, isError, isLoading } = useProfile(username || "");
  const { loans, fetchPage: fetchLoans } = useLoans(`username=${username}`);
  const { collaterals, fetchPage: fetchCollaterals } = useCollaterals(
    `username=${username}`
  );
  const { transactions, fetchPage: fetchTransactions } = useTransactions();
  const [showModal, setShowModal] = useState(false);

  if (isError) return <NotFound />;

  if (isLoading) return <></>;

  return (
    <>
      <EntityLayout
        title={getFullName(profile)}
        onEdit={() => setShowModal(true)}
      >
        <Tabs>
          <Tab eventKey={"info"} title="Información" className="p-3">
            {profile && <ProfileInfo profile={profile} />}
          </Tab>
          <Tab eventKey={"loans"} title="Préstamos" className="p-3">
            <div className="mb-3">
              <LoanSearchInput fetchData={false} />
            </div>
            <LoansDataTable
              loans={loans}
              navigateCallback={(page: number) => fetchLoans(page)}
            />
          </Tab>
          <Tab eventKey={"collaterals"} title="Garantía" className="p-3">
            <CollateralsDataTable
              collaterals={collaterals}
              navigateCallback={(page: number) => fetchCollaterals(page)}
            />
          </Tab>
          <Tab eventKey={"transactions"} title="Transacciones" className="p-3">
            <TransactionsDataTable
              transactions={transactions}
              navigateCallback={(page: number) => fetchTransactions(page)}
            />
          </Tab>
        </Tabs>
      </EntityLayout>
      <Modal
        title="Editar Pérfil"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <ProfileForm
          role={
            (profile?.roles?.[0]?.toLowerCase() as Role) || ("user" as Role)
          }
          edit={profile}
          defaultValues={{
            ...profile,
            dateOfBirth: profile.dateOfBirth.toString(),
            password: "",
          }}
        />
      </Modal>
    </>
  );
};

export default ProfilePage;
