import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import Select from "react-select";
import { Role } from "../../../models/role";
import useClients from "../hooks/useClients";

interface ClientsDataListProps {
  role: Role;
  error?: string;
}

const ClientsDataList = ({
  role = "user",
  error,
  ...props
}: ClientsDataListProps) => {
  const [data] = useClients(role);

  return (
    <>
      <Select
        options={data?.map((client) => ({
          value: client.id,
          label: `${client.firstName} ${client.lastName}`,
        }))}
        {...props}
        required
      />
      {error && <p className="text-danger">{error}</p>}
    </>
  );
};

export default ClientsDataList;
