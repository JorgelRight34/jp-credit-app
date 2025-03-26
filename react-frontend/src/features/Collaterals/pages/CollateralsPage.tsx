import { Tab, Tabs } from "react-bootstrap";
import EntityLayout from "../../../common/EntityLayout";
import useCollaterals from "../hooks/useCollaterals";
import Modal from "../../../common/Modal";
import { useState } from "react";
import CollateralForm from "../components/CollateralForm";
import CollateralsDataTable from "../components/CollateralsDataTable";
import CollateralSearchInput from "../components/CollateralSearchInput";

const CollateralsPage = () => {
  const [collaterals] = useCollaterals();
  const [showModal, setShowModal] = useState(false);

  const hideModal = () => setShowModal(false);

  return (
    <>
      <EntityLayout title="Collaterals" onAddNew={() => setShowModal(true)}>
        <Tabs>
          <Tab eventKey="active" title="Active" className="p-3">
            <div className="mb-3">
              <CollateralSearchInput />
            </div>
            <CollateralsDataTable collaterals={collaterals} />
          </Tab>
          <Tab eventKey="inactive" title="Inactive" className="p-3"></Tab>
        </Tabs>
      </EntityLayout>
      <Modal title="Add Collateral" show={showModal} onHide={hideModal}>
        <CollateralForm />
      </Modal>
    </>
  );
};

export default CollateralsPage;
