import DataTable from "../../../common/DataTable";
import { User } from "../../../models/user";
import ProfileDataRow from "./ProfilesDataRow";

interface ProfilesDataTableProps {
  profiles: User[];
}

const ProfilesDataTable = ({ profiles }: ProfilesDataTableProps) => {
  const headers = ["First Name", "Last Name", "Gender"];
  return (
    <DataTable headers={headers}>
      {profiles?.map((profile) => (
        <ProfileDataRow key={profile.id} profile={profile} />
      ))}
    </DataTable>
  );
};

export default ProfilesDataTable;
