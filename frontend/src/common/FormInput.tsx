import React from "react";

interface FormInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  name: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
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
  required,
  ...props
}: FormInputProps) => {
  return (
    <>
      <label className="form-label">{label}</label>
      <input
        {...props}
        type={type}
        name={name}
        className="form-control"
        onChange={onChange}
        required={required}
        disabled={disabled}
        value={value}
      />
      {error && <p className="text-danger">{error}</p>}
    </>
  );
};

export default FormInput;
