import { Role } from "../../../models/role";
import { User } from "../../../models/user";
import useAddToRole from "../hooks/useAddToRole";
import useProfiles from "../hooks/useProfiles";
import ProfilesDataTable from "./ProfilesDataTable";
import ProfileSearchForm from "./ProfileSearchForm";

interface AddProfileToRoleFormProps {
  role: Role;
}

const AddProfileToRoleForm = ({ role }: AddProfileToRoleFormProps) => {
  const { profiles, fetchPage } = useProfiles("user");
  const [addToRole] = useAddToRole();

  const onRowClick = async (profile: User) => {
    addToRole(profile.username, role);
  };

  return (
    <div className="p-3">
      <ProfileSearchForm role="client" />
      <ProfilesDataTable
        navigateCallback={(page: number) => fetchPage(page)}
        profiles={profiles}
        onRowClick={onRowClick}
      />
    </div>
  );
};

export default AddProfileToRoleForm;
