import DataTable from "../../../common/DataTable";
import EntityLayout from "../../../common/EntityLayout";
import AdminDataRow from "../components/AdminDataRow";
import useAdmins from "../hooks/useAdmins";

const AdminsPage = () => {
  const [admins] = useAdmins();
  const headers = ["Id", "First Name", "Last Name", "Gender"];

  return (
    <>
      <EntityLayout title="Administrators">
        <DataTable headers={headers}>
          {admins?.map((admin) => (
            <AdminDataRow key={admin.id} admin={admin} />
          ))}
        </DataTable>
      </EntityLayout>
    </>
  );
};

export default AdminsPage;
