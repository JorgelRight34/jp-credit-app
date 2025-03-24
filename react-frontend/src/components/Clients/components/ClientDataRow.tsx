import { User } from "../../../models/user";

interface ClientDataRow {
  client: User;
}

const ClientDataRow = ({ client }: ClientDataRow) => {
  return (
    <tr>
      <td>{client.id}</td>
      <td>{client.firstName}</td>
      <td>{client.lastName}</td>
      <td>{client.gender}</td>
    </tr>
  );
};

export default ClientDataRow;
