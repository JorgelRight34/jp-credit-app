import { FormField } from "../../models/formField";

interface TextareaInputProps<TData> {
  formField: FormField<TData>;
  disabled?: boolean;
}

const TextareaInput = <TData,>({
  formField,
  disabled,
  ...props
}: TextareaInputProps<TData>) => {
  return (
    <textarea
      {...props}
      name={formField.name}
      rows={formField.rows}
      disabled={disabled}
      required={formField.required}
      className="form-control"
    ></textarea>
  );
};

export default TextareaInput;
