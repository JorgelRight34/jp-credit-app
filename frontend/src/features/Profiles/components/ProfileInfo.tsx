import { NavLink } from "react-router";
import EntityCard from "../../../common/EntityCard";
import InfoTable from "../../../common/InfoTable";
import { User } from "../../../models/user";
import { toFormattedDate } from "../../../utils/utils";
import useProfileStats from "../hooks/useProfileStats";
import "../profiles.css";

interface ProfileInfoProps {
  profile: User;
}

const ProfileInfo = ({ profile }: ProfileInfoProps) => {
  const [stats] = useProfileStats(profile.username);

  return (
    <div className="row mx-0">
      <div className="col-lg-3 d-flex align-items-center">
        <EntityCard
          header={
            <NavLink to={`/profiles/${profile.username}`}>
              {profile.firstName}
            </NavLink>
          }
          photoUrl={profile.photo?.url || "/default-profile-pic.webp"}
          footer={profile.roles?.[0] || "User"}
        />
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
            [
              "Marital Status",
              profile.maritalStatus,
              "Landline",
              profile.landline,
            ],
            [
              "Current Loan",
              stats?.lastLoan?.id?.toString() || "---",
              "Last Payment",
              stats?.lastTransaction?.id?.toString() || "---",
            ],
          ]}
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
