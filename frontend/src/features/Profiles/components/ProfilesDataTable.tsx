import { ColumnDef } from "@tanstack/react-table";
import DataTable from "../../../common/DataTable";
import { User } from "../../../models/user";
import { useNavigate } from "react-router";

interface ProfilesDataTableProps {
  profiles: User[];
  navigateCallback: (page: number) => void;
}

const ProfilesDataTable = ({ profiles }: ProfilesDataTableProps) => {
  const columns: ColumnDef<User>[] = [
    { accessorKey: "firstName", header: "First Name" },
    { accessorKey: "lastName", header: "Last Name" },
    { accessorKey: "gender", header: "Gender" },
  ];
  const navigate = useNavigate();

  return (
    <DataTable
      columns={columns}
      data={profiles}
      onRowClick={(profile: User) => navigate(`/profiles/${profile.id}`)}
    />
  );
};

export default ProfilesDataTable;
