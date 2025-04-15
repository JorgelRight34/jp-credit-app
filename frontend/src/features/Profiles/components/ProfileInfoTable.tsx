import { NavLink } from "react-router";
import { User } from "../../../models/user";
import InfoTable from "../../../common/DataTable/InfoTable";
import PhoneLink from "../../../common/ui/PhoneLink";
import { toFormattedDate, toTitleCase } from "../../../utils/utils";
import {
  maritalStatusSpanishTranslations,
  roleSpanishTranslations,
} from "../../../utils/constants";
import { MaritalStatus } from "../../../models/maritalStatus";
import { ProfileStats } from "../../../models/profileStats";
import { Role } from "../../../models/role";

interface ProfileInfoTableProps {
  profile: User;
  stats: ProfileStats;
}

const ProfileInfoTable = ({ profile, stats }: ProfileInfoTableProps) => {
  return (
    <InfoTable
      data={[
        [
          "DNI",
          profile.dni,
          "Teléfono",
          <PhoneLink phoneNumber={profile.officePhone} />,
        ],
        ["Nombres", profile.firstName, "Apellidos", profile.lastName],
        [
          "Dirección",
          profile.address,
          "Correo",
          <a href={`mailto:${profile.email}`}>{profile.email}</a>,
        ],
        [
          "Nacimiento",
          toFormattedDate(new Date(profile.dateOfBirth)),
          "Género",
          profile.gender,
        ],
        [
          "Estado Civil",
          toTitleCase(
            maritalStatusSpanishTranslations[
              profile.maritalStatus.toLowerCase() as MaritalStatus
            ] || ""
          ),
          "Teléfono Fijo",
          <PhoneLink phoneNumber={profile.landline} />,
        ],
        [
          "Préstamo Actual",
          <NavLink
            to={stats?.lastLoan?.id ? `/loans/${stats?.lastLoan?.id}` : ""}
          >
            Préstamo No.{stats?.lastLoan?.id?.toString() || "---"}
          </NavLink>,
          "Último Pago",
          stats?.lastTransaction?.id?.toString() || "---",
        ],
        [
          "Roles",
          <span className="text-wrap">
            {toTitleCase(
              profile.roles
                ?.map(
                  (role) => roleSpanishTranslations[role.toLowerCase() as Role]
                )
                .join(", ") || "---"
            )}
          </span>,
          "",
          "",
        ],
      ]}
    />
  );
};

export default ProfileInfoTable;
