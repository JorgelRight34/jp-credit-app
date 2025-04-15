import { Tabs, Tab } from "react-bootstrap";
import EntityLayout from "../../../layouts/EntityLayout";
import CustomArmotization from "../components/CustomArmotization";
import ArmotizationLoan from "../components/ArmotizationLoan";
import { useState } from "react";
import useDownloadArmotization from "../hooks/useDownloadArmotization";

const ArmotizationsPage = () => {
  const [selectedTab, setSelectedTab] = useState<string>("armotization");
  const [downloadCustomArmotization, downloadLoanArmotization] =
    useDownloadArmotization();
  const [loanId, setLoanId] = useState<number | null>(null);
  const [query, setQuery] = useState("");

  const handleDownload = async () => {
    if (selectedTab === "armotization") {
      if (!query) return;
      await downloadCustomArmotization(query);
    } else {
      if (loanId) {
        await downloadLoanArmotization(loanId);
      }
    }
  };

  return (
    <EntityLayout title="Armotizaciones" onDownload={handleDownload}>
      <Tabs onSelect={(k) => setSelectedTab(k as string)}>
        <Tab eventKey="armotization" title="Armotización" className="p-3">
          <CustomArmotization setQuery={setQuery} />
        </Tab>
        <Tab
          eventKey="loan"
          title="Armotización de un Préstamo"
          className="p-3"
        >
          <ArmotizationLoan setLoanId={setLoanId} />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default ArmotizationsPage;
