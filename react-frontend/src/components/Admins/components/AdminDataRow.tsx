import { Admin } from "../../../models/admin";

interface AdminDataRowProps {
  admin: Admin;
}

const AdminDataRow = ({ admin }: AdminDataRowProps) => {
  return (
    <tr>
      <td>{admin.id}</td>
      <td>{admin.firstName}</td>
      <td>{admin.lastName}</td>
      <td>{admin.gender}</td>
    </tr>
  );
};

export default AdminDataRow;
