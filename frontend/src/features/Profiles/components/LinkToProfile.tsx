import { User } from "../../../models/user";
import AppLink from "../../../common/ui/AppLink";
import { getFirstAndLastName, getFullName } from "../../../utils/utils";

interface LinkToProfileProps {
  profile: User;
  fullName?: boolean;
  onClick?: (event: React.MouseEvent) => void;
}

const LinkToProfile = ({
  profile,
  fullName = false,
  onClick,
}: LinkToProfileProps) => {
  return (
    <AppLink to={`/profiles/${profile.username}`} onClick={onClick}>
      {fullName ? getFullName(profile) : getFirstAndLastName(profile)}
    </AppLink>
  );
};

export default LinkToProfile;
