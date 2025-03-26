import { Tab, Tabs } from "react-bootstrap";
import EntityLayout from "../../../common/EntityLayout";
import CollateralForm from "../components/CollateralForm";
import { useParams } from "react-router";
import useCollateral from "../hooks/useCollateral";
import Modal from "../../../common/Modal";
import { useState } from "react";

const CollateralPage = () => {
  const { id } = useParams();
  const [collateral] = useCollateral(id);
  const [showModal, setShowModal] = useState(false);

  if (!collateral) return <>Not Found</>;

  return (
    <>
      <EntityLayout title={`Collateral`} onEdit={() => setShowModal(true)}>
        <Tabs>
          <Tab eventKey="collateral" title="Collateral" className="p-3"></Tab>
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
