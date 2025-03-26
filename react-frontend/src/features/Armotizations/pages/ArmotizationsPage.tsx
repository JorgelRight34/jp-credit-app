import { Tabs, Tab } from "react-bootstrap";
import EntityLayout from "../../../common/EntityLayout";

const ArmotizationsPage = () => {
  return (
    <EntityLayout title="Armotizations">
      <Tabs>
        <Tab eventKey="armotization" title="Armotization" className="p-3"></Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default ArmotizationsPage;
