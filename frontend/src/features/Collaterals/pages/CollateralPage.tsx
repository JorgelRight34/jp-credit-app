import { Tab } from "react-bootstrap";
import EntityLayout from "../../../layouts/EntityLayout";
import CollateralForm from "../components/CollateralForm";
import { useParams } from "react-router";
import useCollateral from "../hooks/useCollateral";
import Modal from "../../../common/ui/Modal";
import { useState } from "react";
import NotFound from "../../../pages/NotFound";
import LoanInfo from "../../Loans/components/LoanInfo";
import ProfileInfo from "../../Profiles/components/ProfileInfo";
import CollateralInfo from "../components/CollateralInfo";
import EntityTabs from "../../../common/ui/EntityTabs";
import CollateralFilesExplorer from "../components/CollateralFilesExplorer";
import TabTitle from "../../../common/TabTitle";

const CollateralPage = () => {
  const { id } = useParams();
  const { collateral, isError } = useCollateral(id || "");
  const [showModal, setShowModal] = useState(false);

  if (isError) return <NotFound />;

  if (!collateral) return <></>;

  return (
    <>
      <EntityLayout title={`Garantía`} onEdit={() => setShowModal(true)}>
        <EntityTabs defaultActiveKey="info">
          <Tab eventKey="info" title="Garantía" className="p-3">
            <CollateralInfo collateral={collateral} />
          </Tab>
          <Tab
            eventKey={"loan"}
            title={
              <TabTitle
                title="Préstamo"
                path={`/loans/${collateral.loan.id}`}
              />
            }
            className="p-3"
          >
            <LoanInfo loan={collateral.loan} />
          </Tab>
          <Tab
            eventKey="client"
            title={
              <TabTitle
                title="Cliente"
                path={`/profiles/${collateral.owner.username}`}
              />
            }
            className="p-3"
          >
            <ProfileInfo profile={collateral.owner} />
          </Tab>
          <Tab eventKey={"files"} title="Archivos" className="p-3">
            <CollateralFilesExplorer collateral={collateral} />
          </Tab>
        </EntityTabs>
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
            location: collateral.location || "",
            expirationDate: collateral.expirationDate || "",
            status: collateral.status.toLowerCase(),
            condition: collateral.condition.toLowerCase(),
          }}
        />
      </Modal>
    </>
  );
};

export default CollateralPage;
