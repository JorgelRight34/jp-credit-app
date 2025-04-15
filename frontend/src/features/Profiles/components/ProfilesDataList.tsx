import AsyncSelect from "react-select/async";
import { Role } from "../../../models/role";
import { useState } from "react";
import api from "../../../api";
import { User } from "../../../models/user";
import { SingleValue } from "react-select";

interface ProfilesDataListProps {
  role: Role;
  error?: string;
  isDisabled?: boolean;
  data?: User[];
}

interface Option {
  value: string | number;
  label: string;
}

const ProfilesDataList = ({
  role = "client",
  error,
  data,
  isDisabled = false,
  ...props
}: ProfilesDataListProps) => {
  const [query, setQuery] = useState<Option | null>(null);

  const loadOptions = async (inputValue: string): Promise<Option[]> => {
    if (data)
      // Return given data
      return data.map((item) => ({
        value: item.id,
        label: `${item.firstName} | ${item.lastName} (${item.label})`,
      }));

    // Fetch data from the api
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
        key={data?.length} // Rerenders each time data (if data is given) changes
        placeholder="---"
        defaultOptions
        onChange={(selectedOption: SingleValue<Option> | null) => {
          setQuery(selectedOption);
        }}
        isDisabled={isDisabled}
        loadOptions={loadOptions}
        value={query}
        {...props}
        styles={{
          control: (provided) => ({
            ...provided,
            width: "200px",
          }),
          menu: (provided) => ({
            ...provided,
            width: "300px",
            zIndex: 10,
          }),
        }}
        required
      />
      {error && <p className="text-danger">{error}</p>}
    </>
  );
};

export default ProfilesDataList;
