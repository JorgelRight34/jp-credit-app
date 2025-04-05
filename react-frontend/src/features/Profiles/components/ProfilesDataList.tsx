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
    console.log(inputValue);
    const response = await api.get(
      `users/role/${role}/?firstname=${inputValue}&lastname=${inputValue}`
    );

    return response.data.map((item: User) => ({
      value: item.id,
      label: `${item.firstName} | ${item.lastName}`,
    }));
  };

  return (
    <>
      <AsyncSelect
        defaultOptions
        onChange={(selectedOption: SingleValue<Option> | null) => {
          console.log("changing");
          setQuery(selectedOption);
        }}
        loadOptions={loadOptions}
        value={query}
        {...props}
        styles={{
          menu: (provided) => ({
            ...provided,
            width: "300px",
            zIndex: 10,
          }),
        }}
        required
      />
      {query}
      {error && <p className="text-danger">{error}</p>}
    </>
  );
};

export default ProfilesDataList;
