import React from "react";

type LoanSearchInputProps = {
  label: string;
  id: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const LoanSearchInput = ({ label, id, ...props }: LoanSearchInputProps) => {
  return (
    <div>
      <label className="form-label mb-2" htmlFor={id}>
        {label}
      </label>
      <input className="form-control" id={id} {...props} />
    </div>
  );
};

export default LoanSearchInput;
