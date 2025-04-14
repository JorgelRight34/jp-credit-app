import { Role } from "../../../models/role";
import useSearchProfile from "../hooks/useSearchProfile";

interface ProfileSearchInputProps {
  role: Role;
  field: "firstname" | "lastname";
  placeholder?: string;
}

const ProfileSearchInput = ({
  role,
  field = "firstname",
  placeholder,
}: ProfileSearchInputProps) => {
  const { query, handleOnChange, fetchProfiles } = useSearchProfile(
    role,
    field
  );

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") fetchProfiles();
  };

  return (
    <>
      <input
        className="form-control"
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
      />
    </>
  );
};

export default ProfileSearchInput;
