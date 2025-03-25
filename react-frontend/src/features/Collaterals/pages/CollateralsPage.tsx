import { Tab, Tabs } from "react-bootstrap";
import EntityLayout from "../../../common/EntityLayout";
import useCollaterals from "../hooks/useCollaterals";
import DataTable from "../../../common/DataTable";
import CollateralDataRow from "../components/CollateralDataRow";
import Modal from "../../../common/Modal";
import { useState } from "react";
import CollateralForm from "../components/CollateralForm";

const CollateralsPage = () => {
  const [collaterals] = useCollaterals();
  const [showModal, setShowModal] = useState(false);
  const headers = ["Id", "Title", "Value", "Client"];

  const hideModal = () => setShowModal(false);

  return (
    <>
      <EntityLayout title="Collaterals" onAddNew={() => setShowModal(true)}>
        <Tabs>
          <Tab eventKey="active" title="Active" className="p-3">
            <DataTable headers={headers}>
              {collaterals.map((collateral, key) => (
                <CollateralDataRow key={key} collateral={collateral} />
              ))}
            </DataTable>
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
