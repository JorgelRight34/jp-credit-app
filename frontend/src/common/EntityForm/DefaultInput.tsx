import { FormField } from "../../models/formField";
import { getTodayFormattedDate } from "../../utils/utils";

interface DefaultInputProps<TData> {
  formField: FormField<TData>;
  disabled?: boolean;
}

const DefaultInput = <TData,>({
  formField,
  disabled,
  ...props
}: DefaultInputProps<TData>) => {
  return (
    <>
      <input
        {...props}
        type={formField.type}
        name={formField.name}
        className="form-control"
        required={formField.required}
        disabled={disabled}
        defaultValue={
          formField.defaultToToday
            ? getTodayFormattedDate()
            : formField.defaultValue || undefined
        }
      />
      {formField.showOnEdit ? "true" : "false"}
    </>
  );
};

export default DefaultInput;
