import { Tab, Tabs } from "react-bootstrap";
import EntityLayout from "../../../common/EntityLayout";
import CollateralForm from "../components/CollateralForm";
import { useParams } from "react-router";
import useCollateral from "../hooks/useCollateral";
import Modal from "../../../common/Modal";
import { useState } from "react";
import NotFound from "../../../pages/NotFound";
import LoanInformation from "../../Loans/components/LoanInformation";
import ProfileInfo from "../../Profiles/components/ProfileInfo";

const CollateralPage = () => {
  const { id } = useParams();
  const { collateral, error } = useCollateral(id);
  const [showModal, setShowModal] = useState(false);

  if (error) return <NotFound />;

  if (!collateral) return <></>;

  return (
    <>
      <EntityLayout title={`Collateral`} onEdit={() => setShowModal(true)}>
        <Tabs>
          <Tab eventKey="collateral" title="Collateral" className="p-3"></Tab>
          <Tab eventKey={"loan"} title="Loan" className="p-3">
            <LoanInformation loan={collateral.loan} />
          </Tab>
          <Tab eventKey="client" title="Client" className="p-3">
            <ProfileInfo profile={collateral.client} />
          </Tab>
        </Tabs>
      </EntityLayout>
      <Modal
        title="Edit Collateral"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <CollateralForm
          edit={collateral.id}
          defaultValues={{
            ...collateral,
          }}
        />
      </Modal>
    </>
  );
};

export default CollateralPage;
