import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "../../../models/user";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { getFirstAndLastName, toTitleCase } from "../../../utils/utils";
import { roleSpanishTranslations } from "../../../utils/constants";
import { Role } from "../../../models/role";

interface ProfileCardProps {
  profile: User;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
    <div className="border-accent-secondary rounded p-3 shadow-sm">
      <h3 className="text-center mb-3">{getFirstAndLastName(profile)}</h3>
      <img
        className="rounded-lg shadow-sm w-full h-[300px] object-cover mb-3"
        src={profile.photo?.url || "/default-profile-pic.webp"}
        alt={`Foto de ${profile.username}`}
      />
      <div className="d-flex flex-column">
        <span className="mb-3 mx-auto">
          <FontAwesomeIcon className="me-2" icon={faEnvelope} />
          <span className="mb-0">{profile.email}</span>
        </span>
        <span className=" mx-auto">
          <FontAwesomeIcon className="me-2" icon={faLocationDot} />
          <span className="mb-0">{profile.address}</span>
        </span>
      </div>
    </div>
  );
};

export default ProfileCard;
