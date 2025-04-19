import AsyncSelect from "react-select/async";
import { Role } from "../../../models/role";
import useProfileDataList from "../hooks/useProfileDataList";
import { useEffect } from "react";
import SelectInput from "../../../common/EntityForm/SelectInput";

interface ProfilesDataListProps {
  role: Role;
  isDisabled?: boolean;
  loanId?: string | number;
}

const ProfilesDataList = ({
  role = "user",
  isDisabled = false,
  loanId,
  ...props
}: ProfilesDataListProps) => {
  const { loadOptions, loadLoanProfiles, options, query, setQuery, error } =
    useProfileDataList(role);

  useEffect(() => {
    if (loanId) loadLoanProfiles(loanId);
  }, [loanId]);

  return (
    <>
      {loanId !== null && loanId !== undefined ? (
        <SelectInput
          defaultValue={options[0]?.value}
          firstOption={["", "---"]}
          disabled={isDisabled}
          options={options.map((option) => [option.value, option.label])}
          {...props}
        />
      ) : (
        <AsyncSelect
          placeholder="---"
          defaultOptions
          onChange={(selectedOption) => {
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
        />
      )}
      <span className="text-danger">
        {error ? "El préstamo no existe." : ""}
      </span>
    </>
  );
};

export default ProfilesDataList;
