import React from "react";
import { getTodayFormattedDate } from "../../utils/utils";

interface FormInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  name: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  defaultToToday?: boolean;
  value?: string;
  showOnEdit?: boolean;
  options?: (string | number)[][];
  defaultValue?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
const FormInput = ({
  label,
  name,
  disabled,
  type = "text",
  onChange,
  error,
  value,
  options,
  defaultValue,
  defaultToToday = false,
  required,
  showOnEdit,
  ...props
}: FormInputProps) => {
  return (
    <>
      <label className="form-label">
        {label}
        {required !== false ? <span className="text-red-500"> *</span> : ""}
        {required}
      </label>
      <input
        {...props}
        type={type}
        name={name}
        className="form-control"
        onChange={onChange}
        required={required}
        disabled={disabled}
        value={defaultToToday ? getTodayFormattedDate() : value}
      />
      {error && <p className="text-danger">{error}</p>}
    </>
  );
};

export default FormInput;
