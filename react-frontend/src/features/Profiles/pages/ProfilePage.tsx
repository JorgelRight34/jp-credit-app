import { Tab, Tabs } from "react-bootstrap";
import EntityLayout from "../../../common/EntityLayout";
import ProfileInfo from "../components/ProfileInfo";
import { useParams } from "react-router";
import LoansDataTable from "../../Loans/components/LoansDataTable";
import useLoans from "../../Loans/hooks/useLoans";
import Modal from "../../../common/Modal";
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
import LoanSearchInput from "../../Loans/components/LoanSearchInput";

const ProfilePage = () => {
  const { username } = useParams();
  const { profile, error } = useProfile(username || "");
  const [userLoans] = useLoans(`username=${username}`);
  const [collaterals] = useCollaterals(`username=${username}`);
  const [transactions] = useTransactions(`username=${username}`);
  const [showModal, setShowModal] = useState(false);

  if (error) return <NotFound />;

  if (!profile) return <></>;

  return (
    <>
      <EntityLayout
        title={getFullName(profile)}
        onEdit={() => setShowModal(true)}
      >
        <Tabs>
          <Tab eventKey={"info"} title="Information" className="p-3">
            {profile && <ProfileInfo profile={profile} />}
          </Tab>
          <Tab eventKey={"loans"} title="Loans" className="p-3">
            <div className="mb-3">
              <LoanSearchInput placeholder="Search by id" fetchData={false} />
            </div>
            <LoansDataTable loans={userLoans} />
          </Tab>
          <Tab eventKey={"collaterals"} title="Collaterals" className="p-3">
            <CollateralsDataTable collaterals={collaterals} />
          </Tab>
          <Tab eventKey={"transactions"} title="Transactions" className="p-3">
            <TransactionsDataTable transactions={transactions} />
          </Tab>
        </Tabs>
      </EntityLayout>
      <Modal
        title="Edit profile"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <ProfileForm
          role={
            (profile?.roles?.[0]?.toLowerCase() as Role) || ("user" as Role)
          }
          edit={profile.id}
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
