import { Tab, Tabs } from "react-bootstrap";
import EntityLayout from "../../../common/EntityLayout";
import ProfileInfo from "../components/ProfileInfo";
import { useParams } from "react-router";
import LoansDataTable from "../../Loans/components/LoansDataTable";
import useLoans from "../../Loans/hooks/useLoans";
import { useEffect, useState } from "react";
import Modal from "../../../common/Modal";
import useProfile from "../hooks/useProfile";
import CollateralsDataTable from "../../Collaterals/components/CollateralsDataTable";
import useCollaterals from "../../Collaterals/hooks/useCollaterals";
import useTransactions from "../../Transactions/hooks/useTransactions";
import TransactionsDataTable from "../../Transactions/components/TransactionsDataTable";

const ProfilePage = () => {
  const { username } = useParams();
  const [profile] = useProfile(username || "");
  const [userLoans] = useLoans(`username=${username}`);
  const [collaterals] = useCollaterals(`username=${username}`);
  const [transactions] = useTransactions(`username=${username}`);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {}, [profile]);

  if (profile)
    return (
      <>
        <EntityLayout title="Profile">
          <Tabs>
            <Tab eventKey={"info"} title="Information" className="p-3">
              {profile && <ProfileInfo profile={profile} />}
            </Tab>
            <Tab eventKey={"loans"} title="Loans" className="p-3">
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
          e
        </Modal>
      </>
    );
};

export default ProfilePage;
