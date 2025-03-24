import DataTable from "../../../common/DataTable";
import EntityLayout from "../../../common/EntityLayout";
import ClientDataRow from "../components/ClientDataRow";
import useClients from "../hooks/useClients";

const ClientsPage = () => {
  const [clients] = useClients();

  const headers = ["Id", "First Name", "Last Name", "Gender"];

  return (
    <>
      <EntityLayout title="Clients">
        <DataTable headers={headers}>
          {clients?.map((client) => (
            <ClientDataRow key={client.id} client={client} />
          ))}
        </DataTable>
      </EntityLayout>
    </>
  );
};

export default ClientsPage;
