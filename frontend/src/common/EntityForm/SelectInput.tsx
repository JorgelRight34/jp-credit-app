import { FormField } from "../../models/formField";

interface SelectInputProps<TData> {
  formField?: FormField<TData>;
  disabled?: boolean;
  options?: (string | number)[][];
}

const SelectInput = <TData,>({
  formField,
  disabled,
  options,
  ...props
}: SelectInputProps<TData>) => {
  return (
    <select
      className="form-select"
      name={formField?.name}
      disabled={disabled}
      required={formField?.required}
      {...props}
    >
      {(formField?.options || options)?.map((option, key) => (
        <option key={key} value={option[0]}>
          {option[1]}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
