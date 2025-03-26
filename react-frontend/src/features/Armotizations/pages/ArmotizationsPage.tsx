import { Tabs, Tab } from "react-bootstrap";
import EntityLayout from "../../../common/EntityLayout";
import CustomArmotization from "../components/CustomArmotization";
import ArmotizationLoan from "../components/ArmotizationLoan";

const ArmotizationsPage = () => {
  return (
    <EntityLayout title="Armotizations">
      <Tabs>
        <Tab eventKey="armotization" title="Armotization" className="p-3">
          <CustomArmotization />
        </Tab>
        <Tab
          eventKey="Loan Armotization"
          title="Loan Armotization"
          className="p-3"
        >
          <ArmotizationLoan />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default ArmotizationsPage;
