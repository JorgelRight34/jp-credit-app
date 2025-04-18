import { FormField } from "../../models/formField";

interface SelectInputProps<TData> {
  formField?: FormField<TData>;
  disabled?: boolean;
  options?: (string | number)[][];
  firstOption?: (string | number)[];
  defaultValue?: string | number;
}

const SelectInput = <TData,>({
  formField,
  firstOption,
  disabled,
  defaultValue,
  options,
  ...props
}: SelectInputProps<TData>) => {
  return (
    <select
      className="form-select"
      name={formField?.name}
      disabled={disabled}
      required={formField?.required}
      defaultValue={defaultValue}
      {...props}
    >
      {firstOption && <option value={firstOption[0]}>{firstOption[1]}</option>}
      {(formField?.options || options)?.map((option, key) => (
        <option key={key} value={option[0]}>
          {option[1]}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
