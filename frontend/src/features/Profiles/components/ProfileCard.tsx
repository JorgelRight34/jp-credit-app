import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "../../../models/user";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { getFirstAndLastName } from "../../../utils/utils";
import ImageWithLightBox from "../../../common/ImageWithLightBox";

interface ProfileCardProps {
  profile: User;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
    <div className="border-accent-secondary rounded p-3 shadow-sm max-w-xs">
      {/* Heading */}
      <h3 className="text-center mb-3">{getFirstAndLastName(profile)}</h3>
      {/* Image */}
      <ImageWithLightBox
        className="rounded-lg shadow-sm w-full h-[300px] object-cover mb-3"
        src={profile.photo?.url || "/default-profile-pic.webp"}
        alt={`Foto de ${profile.username}`}
        image={profile.photo}
      />
      {/* Contact */}
      <div className="flex flex-col">
        {/* Email */}
        <span
          className="mb-3 mx-auto truncate flex w-full items-center justify-center cursor-pointer"
          title={profile.email}
          data-title={profile.email}
        >
          <FontAwesomeIcon className="me-2 shrink-0" icon={faEnvelope} />
          <span className="truncate w-full">{profile.email}</span>
        </span>
        {/* Address */}
        <span
          className="flex w-full items-center truncate justify-center mx-auto cursor-pointer"
          title={profile.address}
          data-title={profile.address}
        >
          <FontAwesomeIcon className="me-2" icon={faLocationDot} />
          <span className="mb-0">{profile.address}</span>
        </span>
      </div>
    </div>
  );
};

export default ProfileCard;
