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
