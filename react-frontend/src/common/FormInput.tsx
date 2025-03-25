interface FormInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  name: string;
  error?: string;
  required?: boolean;
}

const FormInput = ({
  label,
  name,
  type = "text",
  error,
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
        required={required}
      />
      {error && <p className="text-danger">{error}</p>}
    </>
  );
};

export default FormInput;
