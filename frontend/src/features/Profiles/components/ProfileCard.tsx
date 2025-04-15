import { NavLink } from "react-router";
import EntityCard from "../../../common/EntityCard";
import { User } from "../../../models/user";

interface ProfileCardProps {
  profile: User;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
    <EntityCard
      header={
        <NavLink
          className="text-accent-secondary text-decoration-none"
          to={`/profiles/${profile.username}`}
        >
          {profile.firstName}
        </NavLink>
      }
      photoUrl={profile.photo?.url || "/default-profile-pic.webp"}
    />
  );
};

export default ProfileCard;
