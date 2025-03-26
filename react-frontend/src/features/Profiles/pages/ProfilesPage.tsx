import EntityLayout from "../../../common/EntityLayout";
import useProfiles from "../hooks/useProfiles";
import { useState } from "react";
import ProfileForm from "../components/ProfileForm";
import Modal from "../../../common/Modal";
import { Tab, Tabs } from "react-bootstrap";
import { Role } from "../../../models/role";
import ProfilesDataTable from "../components/ProfilesDataTable";
import ProfileSearchInput from "../components/ProfileSearchInput";

const ProfilesPage = () => {
  const [clients] = useProfiles("client");
  const [loanOfficers] = useProfiles("loanOfficer");
  const [admins] = useProfiles("admin");
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>("user");

  const hideModal = () => setShowModal(false);

  return (
    <>
      <EntityLayout title="Profiles" onAddNew={() => setShowModal(true)}>
        <Tabs onSelect={(k) => setSelectedRole(k as Role)}>
          <Tab title="Clients" eventKey="client" className="p-3">
            <div className="mb-3">
              <ProfileSearchInput role={"client"} />
            </div>
            <ProfilesDataTable profiles={clients} />
          </Tab>
          <Tab eventKey="loanOfficer" title="Loan Officers" className="p-3">
            <div className="p-3">
              <input
                className="form-control"
                type="search"
                placeholder="Search a loan"
              />
            </div>
            <ProfilesDataTable profiles={loanOfficers} />
          </Tab>
          <Tab eventKey="admin" title="Admins" className="p-3">
            <div className="p-3">
              <input
                className="form-control"
                type="search"
                placeholder="Search a loan"
              />
            </div>
            <ProfilesDataTable profiles={admins} />
          </Tab>
        </Tabs>
      </EntityLayout>
      <Modal
        title={`Add New ${selectedRole}`}
        show={showModal}
        onHide={hideModal}
      >
        <ProfileForm role={selectedRole} />
      </Modal>
    </>
  );
};

export default ProfilesPage;
