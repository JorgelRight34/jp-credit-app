import EntityLayout from "../../../layouts/EntityLayout";
import useProfiles from "../hooks/useProfiles";
import { useState } from "react";
import ProfileForm from "../components/ProfileForm";
import Modal from "../../../common/ui/Modal";
import { Tab, Tabs } from "react-bootstrap";
import { Role } from "../../../models/role";
import ProfilesDataTable from "../components/ProfilesDataTable";
import ProfileSearchForm from "../components/ProfileSearchForm";
import AccentBtn from "../../../common/ui/AccentBtn";
import AddProfileToRoleForm from "../components/AddProfileToRoleForm";
import { toTitleCase } from "../../../utils/utils";
import { roleSpanishTranslations } from "../../../utils/constants";

const ProfilesPage = () => {
  const { profiles: clients, fetchPage: fetchClients } = useProfiles("client");
  const { profiles: loanOfficers, fetchPage: fetchLoanOfficers } =
    useProfiles("loanOfficer");
  const { profiles: admins, fetchPage: fetchAdmins } = useProfiles("admin");
  const { profiles: guarantors, fetchPage: fetchGuarantors } =
    useProfiles("guarantor");
  const [showCreateFormModal, setShowCreateFormModal] = useState(false);
  const [showAddToRoleFormModal, setShowAddToRoleFormModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>("client");

  return (
    <>
      <EntityLayout
        title="Perfiles"
        onAddNew={() => setShowCreateFormModal(true)}
        extraOption={
          <AccentBtn
            className="mx-3"
            onClick={() => setShowAddToRoleFormModal(true)}
          >
            Añadir Existente a Rol
          </AccentBtn>
        }
      >
        <Tabs onSelect={(k) => setSelectedRole(k as Role)}>
          <Tab title="Clientes" eventKey="client" className="p-3">
            <ProfileSearchForm role="client" />
            <ProfilesDataTable
              navigateCallback={(page: number) => fetchClients(page)}
              profiles={clients}
            />
          </Tab>
          <Tab eventKey="loanOfficer" title="Agentes" className="p-3">
            <ProfileSearchForm role="loanOfficer" />
            <ProfilesDataTable
              profiles={loanOfficers}
              navigateCallback={(page: number) => fetchLoanOfficers(page)}
            />
          </Tab>
          <Tab eventKey="admin" title="Administradores" className="p-3">
            <ProfileSearchForm role="admin" />
            <ProfilesDataTable
              profiles={admins}
              navigateCallback={(page: number) => fetchAdmins(page)}
            />
          </Tab>
          <Tab eventKey="guarantor" title="Garantes" className="p-3">
            <ProfileSearchForm role="guarantor" />
            <ProfilesDataTable
              profiles={guarantors}
              navigateCallback={(page: number) => fetchGuarantors(page)}
            />
          </Tab>
        </Tabs>
      </EntityLayout>
      <Modal
        title={`Añadir a ${toTitleCase(selectedRole)}`}
        show={showCreateFormModal}
        onHide={() => setShowCreateFormModal(false)}
      >
        <ProfileForm role={selectedRole} />
      </Modal>
      <Modal
        title={`Añadir Existente a ${toTitleCase(
          roleSpanishTranslations[selectedRole]
        )}s`}
        show={showAddToRoleFormModal}
        onHide={() => setShowAddToRoleFormModal(false)}
      >
        <AddProfileToRoleForm role={selectedRole} />
      </Modal>
    </>
  );
};

export default ProfilesPage;
