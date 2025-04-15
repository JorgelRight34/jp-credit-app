import { Tab, Tabs } from "react-bootstrap";
import EntityLayout from "../../../layouts/EntityLayout";
import useCollaterals from "../hooks/useCollaterals";
import Modal from "../../../common/ui/Modal";
import { useState } from "react";
import CollateralForm from "../components/CollateralForm";
import CollateralsDataTable from "../components/CollateralsDataTable";
import CollateralSearchInput from "../components/CollateralSearchInput";

const CollateralsPage = () => {
  const { collaterals, fetchPage } = useCollaterals();
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
              navigateCallback={fetchPage}
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
