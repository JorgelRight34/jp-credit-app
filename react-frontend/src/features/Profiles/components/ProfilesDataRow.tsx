import { useNavigate } from "react-router";
import { User } from "../../../models/user";

interface ProfileDataRow {
  profile: User;
}

const ProfileDataRow = ({ profile }: ProfileDataRow) => {
  const navigate = useNavigate();

  return (
    <tr onClick={() => navigate(`/profiles/${profile.username}`)}>
      <td>{profile.firstName}</td>
      <td>{profile.lastName}</td>
      <td>{profile.gender}</td>
    </tr>
  );
};

export default ProfileDataRow;
