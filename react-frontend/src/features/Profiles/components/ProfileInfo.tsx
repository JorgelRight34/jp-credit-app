import InfoTable from "../../../common/InfoTable";
import { User } from "../../../models/user";
import { toFormattedDate } from "../../../utils/utils";

interface ProfileInfoProps {
  profile: User;
}

const ProfileInfo = ({ profile }: ProfileInfoProps) => {
  return (
    <div className="row mx-0">
      <div className="col-lg-3 d-flex align-items-center">
        <div className="border p-3 rounded-3 shadow-sm">
          <h3 className="text-center mb-3">{profile.firstName}</h3>
          <img
            className="img-fluid w-100 rounded-3 mb-3"
            src={profile.photo?.url || "/default-profile-pic.webp"}
          />
          <h4 className="text-center">{profile.roles?.[0] || "User"}</h4>
        </div>
      </div>
      <div className="col-lg-9 d-flex align-items-center">
        <InfoTable
          data={[
            ["DNI", profile.dni, "Phone", profile.officePhone],
            ["First Name", profile.firstName, "Last Name", profile.lastName],
            ["Address", profile.address, "Email", profile.email],
            [
              "Birthday",
              toFormattedDate(new Date(profile.dateOfBirth)),
              "Gender",
              profile.gender,
            ],
          ]}
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
