import { Tab, Tabs } from "react-bootstrap";
import EntityLayout from "../../../common/EntityLayout";
import useCollaterals from "../hooks/useCollaterals";
import Modal from "../../../common/Modal";
import { useState } from "react";
import CollateralForm from "../components/CollateralForm";
import CollateralsDataTable from "../components/CollateralsDataTable";
import CollateralSearchInput from "../components/CollateralSearchInput";

const CollateralsPage = () => {
  const [collaterals, fetchCollaterals] = useCollaterals();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <EntityLayout title="Garantías" onAddNew={() => setShowModal(true)}>
        <Tabs>
          <Tab eventKey="active" title="Activos" className="p-3">
            <div className="mb-3">
              <CollateralSearchInput placeholder="Buscar por título" />
            </div>
            <CollateralsDataTable
              collaterals={collaterals}
              navigateCallback={fetchCollaterals}
            />
          </Tab>
          <Tab eventKey="inactive" title="Inactivos" className="p-3"></Tab>
        </Tabs>
      </EntityLayout>
      <Modal
        title="Añadir Garantía"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <CollateralForm />
      </Modal>
    </>
  );
};

export default CollateralsPage;
