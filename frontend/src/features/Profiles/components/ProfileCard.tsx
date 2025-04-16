import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "../../../models/user";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

interface ProfileCardProps {
  profile: User;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
    <div>
      <img
        className="img-fluid border rounded-lg shadow-sm w-full h-full object-cover mb-3"
        src={profile.photo?.url || "/default-profile-pic.webp"}
      />
      <div className="mx-auto">
        <div className="d-flex align-items-center mb-3">
          <FontAwesomeIcon className="me-2" icon={faEnvelope} />
          <h6 className="mb-0">{profile.email}</h6>
        </div>
        <div className="d-flex align-items-center">
          <FontAwesomeIcon className="me-2" icon={faLocationDot} />
          <h6 className="mb-0">{profile.address}</h6>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
