import { ColumnDef } from "@tanstack/react-table";
import DataTable from "../../../common/DataTable";
import { User } from "../../../models/user";
import { useNavigate } from "react-router";
import { toFormattedDate } from "../../../utils/utils";

interface ProfilesDataTableProps {
  profiles: User[];
  navigateCallback?: (page: number) => void | Promise<void>;
}

const columns: ColumnDef<User>[] = [
  { accessorKey: "firstName", header: "Nombres", enableSorting: true },
  { accessorKey: "lastName", header: "Apellidos", enableSorting: true },
  { accessorKey: "gender", header: "Género", enableSorting: true },
  {
    accessorKey: "dateOfBirth",
    header: "Nacimiento",
    enableSorting: true,
    cell: ({ row }) => toFormattedDate(new Date(row.original.dateOfBirth)),
  },
];

/**
 * ProfilesDataTable component displays a table of profiles (clientes/admins/loan officers, etc.).
 * It uses the DataTable component to render the data in a tabular format.
 *
 * @param {ProfilesDataTableProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const ProfilesDataTable = ({
  profiles,
  navigateCallback,
}: ProfilesDataTableProps) => {
  const navigate = useNavigate();

  return (
    <DataTable
      columns={columns}
      data={profiles}
      onRowClick={(profile: User) => navigate(`/profiles/${profile.id}`)}
      navigateCallback={navigateCallback}
    />
  );
};

export default ProfilesDataTable;
