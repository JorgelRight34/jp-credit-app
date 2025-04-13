import EntityLayout from "../../../common/EntityLayout";
import useProfiles from "../hooks/useProfiles";
import { useState } from "react";
import ProfileForm from "../components/ProfileForm";
import Modal from "../../../common/Modal";
import { Tab, Tabs } from "react-bootstrap";
import { Role } from "../../../models/role";
import ProfilesDataTable from "../components/ProfilesDataTable";
import ProfileSearchForm from "../components/ProfileSearchForm";

const ProfilesPage = () => {
  const [clients, fetchClients] = useProfiles("client");
  const [loanOfficers, fetchLoanOfficers] = useProfiles("loanOfficer");
  const [admins, fetchAdmins] = useProfiles("admin");
  const [guarantors, fetchGuarantors] = useProfiles("guarantor");
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>("client");

  return (
    <>
      <EntityLayout title="Profiles" onAddNew={() => setShowModal(true)}>
        <Tabs onSelect={(k) => setSelectedRole(k as Role)}>
          <Tab title="Clients" eventKey="client" className="p-3">
            <ProfileSearchForm role="client" />
            <ProfilesDataTable
              navigateCallback={(page: number) => fetchClients(page)}
              profiles={clients}
            />
          </Tab>
          <Tab eventKey="loanOfficer" title="Loan Officers" className="p-3">
            <ProfileSearchForm role="loanOfficer" />
            <ProfilesDataTable
              profiles={loanOfficers}
              navigateCallback={(page: number) => fetchLoanOfficers(page)}
            />
          </Tab>
          <Tab eventKey="admin" title="Admins" className="p-3">
            <ProfileSearchForm role="admin" />
            <ProfilesDataTable
              profiles={admins}
              navigateCallback={(page: number) => fetchAdmins(page)}
            />
          </Tab>
          <Tab eventKey="guarantor" title="Guarantors" className="p-3">
            <ProfileSearchForm role="guarantor" />
            <ProfilesDataTable
              profiles={guarantors}
              navigateCallback={(page: number) => fetchGuarantors(page)}
            />
          </Tab>
        </Tabs>
      </EntityLayout>
      <Modal
        title={`Add New ${selectedRole}`}
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <ProfileForm role={selectedRole} />
      </Modal>
    </>
  );
};

export default ProfilesPage;
