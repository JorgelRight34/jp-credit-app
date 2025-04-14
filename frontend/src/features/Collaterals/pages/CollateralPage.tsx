import { Tab, Tabs } from "react-bootstrap";
import EntityLayout from "../../../common/EntityLayout";
import CollateralForm from "../components/CollateralForm";
import { useParams } from "react-router";
import useCollateral from "../hooks/useCollateral";
import Modal from "../../../common/Modal";
import { useState } from "react";
import NotFound from "../../../pages/NotFound";
import LoanInfo from "../../Loans/components/LoanInfo";
import ProfileInfo from "../../Profiles/components/ProfileInfo";
import CollateralInfo from "../components/CollateralInfo";

const CollateralPage = () => {
  const { id } = useParams();
  const { collateral, error } = useCollateral(id);
  const [showModal, setShowModal] = useState(false);

  if (error) return <NotFound />;

  if (!collateral) return <></>;

  return (
    <>
      <EntityLayout title={`Garantía`} onEdit={() => setShowModal(true)}>
        <Tabs>
          <Tab eventKey="collateral" title="Garantía" className="p-3">
            <CollateralInfo collateral={collateral} />
          </Tab>
          <Tab eventKey={"loan"} title="Préstamo" className="p-3">
            <LoanInfo loan={collateral.loan} />
          </Tab>
          <Tab eventKey="client" title="Cliente" className="p-3">
            <ProfileInfo profile={collateral.client} />
          </Tab>
        </Tabs>
      </EntityLayout>
      <Modal
        title="Editar Garantía"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <CollateralForm
          edit={collateral}
          defaultValues={{
            ...collateral,
            status: collateral.status.toLowerCase(),
            condition: collateral.condition.toLowerCase(),
          }}
        />
      </Modal>
    </>
  );
};

export default CollateralPage;
