import AsyncSelect from "react-select/async";
import { Role } from "../../../models/role";
import { useState } from "react";
import api from "../../../api";
import { getFullName } from "../../../utils/utils";
import { User } from "../../../models/user";
import { SingleValue } from "react-select";

interface ProfilesDataListProps {
  role: Role;
  error?: string;
}

interface Option {
  value: string | number;
  label: string;
}

const ProfilesDataList = ({
  role = "client",
  error,
  ...props
}: ProfilesDataListProps) => {
  const [query, setQuery] = useState<Option | null>(null);

  const loadOptions = async (inputValue: string): Promise<Option[]> => {
    const response = await api.get(
      `users/role/${role}/?firstname=${inputValue}`
    );

    return response.data.map((item: User) => ({
      value: item.id,
      label: getFullName(item),
    }));
  };

  return (
    <>
      <AsyncSelect
        cacheOptions={true}
        defaultOptions
        onChange={(selectedOption: SingleValue<Option> | null) =>
          setQuery(selectedOption)
        }
        loadOptions={loadOptions}
        value={query}
        {...props}
        required
      />
      {error && <p className="text-danger">{error}</p>}
    </>
  );
};

export default ProfilesDataList;
