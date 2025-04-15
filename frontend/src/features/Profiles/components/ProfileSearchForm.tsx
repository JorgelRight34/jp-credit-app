import { Role } from "../../../models/role";
import ProfileSearchInput from "./ProfileSearchInput";

interface ProfileSearchForm {
  role: Role;
}

const ProfileSearchForm = ({ role }: ProfileSearchForm) => {
  return (
    <div className="row mx-0 mb-3">
      <div className="col-lg-6 ps-0">
        <ProfileSearchInput
          role={role}
          field="firstname"
          placeholder="Buscar por nombres"
        />
      </div>
      <div className="col-lg-6 pe-0">
        <ProfileSearchInput
          role={role}
          field="lastname"
          placeholder="Buscar por apellidos"
        />
      </div>
    </div>
  );
};

export default ProfileSearchForm;
