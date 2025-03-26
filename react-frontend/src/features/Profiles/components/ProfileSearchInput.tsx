import { Role } from "../../../models/role";
import useSearchProfile from "../hooks/useSearchProfile";

interface ProfileSearchInputProps {
  role: Role;
}

const ProfileSearchInput = ({ role }: ProfileSearchInputProps) => {
  const { query, handleOnChange, fetchProfiles } = useSearchProfile(role);

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") fetchProfiles();
  };

  return (
    <input
      className="form-control"
      type="search"
      placeholder="Search a user"
      value={query}
      onChange={handleOnChange}
      onKeyDown={handleOnKeyDown}
    />
  );
};

export default ProfileSearchInput;
