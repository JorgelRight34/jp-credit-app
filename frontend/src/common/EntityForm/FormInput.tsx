import { FormField } from "../../models/formField";
import { Controller } from "react-hook-form";
import ProfilesDataList from "../../features/Profiles/components/ProfilesDataList";
import SelectInput from "./SelectInput";
import TextareaInput from "./TextareaInput";
import DefaultInput from "./DefaultInput";

interface FormInputProps<T> {
  disabled?: boolean;
  showOnEdit?: boolean;
  options?: (string | number)[][];
  defaultValue?: string | number | null;
  formField: FormField<T>;
  watchedValue?: number | string;
}

/**
 * FormInput component is a reusable input field with a label and error message.
 * It can be used for various types of inputs such as text, email, password, etc.
 * @component
 *
 * @param {FormInputProps} props - Props containing the label, type, name, error message, and other input attributes.
 * @returns {JSX.Element} - A JSX element representing the FormInput component.
 * @example
 * <FormInput
 *   label="Username"
 *  name="username"
 *  type="text"
 *  error="Username is required"
 * />
 */
const FormInput = <T,>({
  disabled,
  watchedValue,
  formField,
  ...props
}: FormInputProps<T>) => {
  if (formField.type === "select") {
    return (
      <SelectInput<T> formField={formField} disabled={disabled} {...props} />
    );
  }

  if (formField.profileDataList) {
    return (
      <Controller
        name={formField.name}
        {...props}
        render={({ field }) => (
          <ProfilesDataList
            isDisabled={disabled}
            loanId={
              formField.watchedValue === "loanId"
                ? watchedValue || formField.fixedWatchedValue || undefined
                : undefined
            }
            role={formField.profileRole || "client"}
            {...field} // This binds react-select to React Hook Form
          />
        )}
      />
    );
  }

  if (formField.type === "textarea") {
    return (
      <TextareaInput formField={formField} disabled={disabled} {...props} />
    );
  }

  return <DefaultInput formField={formField} disabled={disabled} {...props} />;
};

export default FormInput;
