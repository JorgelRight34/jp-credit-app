import DataTable from "../../../common/DataTable";
import EntityLayout from "../../../common/EntityLayout";
import ClientDataRow from "../components/ClientDataRow";
import useClients from "../hooks/useClients";
import { useState } from "react";
import ClientForm from "../components/ClientForm";
import Modal from "../../../common/Modal";
import { Tab, Tabs } from "react-bootstrap";
import useLoanOfficers from "../hooks/useLoanOfficers";
import { Role } from "../../../models/role";
import useAdmins from "../../Admins/hooks/useAdmins";

const ClientsPage = () => {
  const [clients] = useClients();
  const [loanOfficers] = useLoanOfficers();
  const [admins] = useAdmins();
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>("user");

  const hideModal = () => setShowModal(false);

  const headers = ["First Name", "Last Name", "Gender"];

  return (
    <>
      <EntityLayout title="Humans" onAddNew={() => setShowModal(true)}>
        <Tabs onSelect={(k) => setSelectedRole(k as Role)}>
          <Tab title="Clients" eventKey="client" className="p-3">
            <DataTable headers={headers}>
              {clients?.map((client) => (
                <ClientDataRow key={client.id} client={client} />
              ))}
            </DataTable>
          </Tab>
          <Tab eventKey="loanOfficer" title="Loan Officers" className="p-3">
            <DataTable headers={headers}>
              {loanOfficers?.map((officer) => (
                <ClientDataRow key={officer.id} client={officer} />
              ))}
            </DataTable>
          </Tab>
          <Tab eventKey="admin" title="Admins" className="p-3">
            <DataTable headers={headers}>
              {admins?.map((admin) => (
                <ClientDataRow key={admin.id} client={admin} />
              ))}
            </DataTable>
          </Tab>
        </Tabs>
      </EntityLayout>
      <Modal title="Add New Client" show={showModal} onHide={hideModal}>
        <ClientForm role={selectedRole} />
      </Modal>
    </>
  );
};

export default ClientsPage;
