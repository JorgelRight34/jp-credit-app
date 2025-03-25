import { useNavigate } from "react-router";
import { User } from "../../../models/user";

interface ClientDataRow {
  client: User;
}

const ClientDataRow = ({ client }: ClientDataRow) => {
  const navigate = useNavigate();

  return (
    <tr onClick={() => navigate(`/clients/${client.username}`)}>
      <td>{client.firstName}</td>
      <td>{client.lastName}</td>
      <td>{client.gender}</td>
    </tr>
  );
};

export default ClientDataRow;
