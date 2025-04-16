import { Controller } from "react-hook-form";
import { FormField } from "../../models/formField";
import MultipleFilesInput from "../ui/MultipleFilesInput";
import FormInput from "./FormInput";
import ProfilesDataList from "../../features/Profiles/components/ProfilesDataList";
import { ZodType } from "zod";
import { schema } from "../../features/Loans/lib/constants";

interface FormFieldInputProps<TData> {
  schema: ZodType<any, any, any>;
  formField: FormField<TData>;
  files?: File[];
  filesMaxLength?: number;
  defaultFileSources?: string[];
  setFiles?: (files: File[] | ((prev: File[]) => File[])) => void;
  setDefaultFileSources?: (
    files: string[] | ((prev: string[]) => string[])
  ) => void;
  className?: string;
  error?: string;
  edit?: TData;
}

const FormFieldInput = <TData,>({
  formField,
  files,
  edit,
  defaultFileSources,
  setDefaultFileSources,
  filesMaxLength = 10,
  setFiles,
  className = "",
  error,
  ...props
}: FormFieldInputProps<TData>) => {
  const { showOnNewRow, ...formFieldProps } = formField;

  if (formField.type === "file" && setFiles && files) {
    return (
      <div className={className}>
        <label className="form-label">
          Archivos ({files.length + (defaultFileSources?.length || 0)})
        </label>
        <div>
          <MultipleFilesInput
            className="w-full"
            files={files}
            setFiles={setFiles}
            setDefaultFileSources={setDefaultFileSources}
            defaultFileSources={defaultFileSources}
            {...{ disabled: formField.disabledFn?.(schema) }}
            maxLength={filesMaxLength}
          />
        </div>
      </div>
    );
  }

  if (formField.type === "select") {
    return (
      <div className={className}>
        {formField.type === "select" && (
          <>
            <label className="form-label" htmlFor={formField.name}>
              {formField.label}
            </label>
            <select
              className="form-select"
              {...props}
              disabled={formField.disabledFn?.(schema)}
            >
              {formField.options?.map((option) => (
                <option key={option[0]} value={option[0]}>
                  {option[1]}
                </option>
              ))}
            </select>
            {error}
          </>
        )}
      </div>
    );
  }

  if (formField.profileDataList) {
    return (
      <div className={className}>
        {edit ? (
          <>
            <label className="form-label" htmlFor={formField.name}>
              {formField.label}
            </label>
            <p className="text-muted mb-0">{formField?.showOnEditFn?.(edit)}</p>
          </>
        ) : (
          <>
            <label className="form-label">{formField.label}</label>
            <Controller
              name={formField.name}
              {...props}
              render={({ field }) => (
                <ProfilesDataList
                  isDisabled={formField.disabledFn?.(schema)}
                  role={formField.profileRole || "client"}
                  error={error}
                  {...field} // This binds react-select to React Hook Form
                />
              )}
            />
          </>
        )}
      </div>
    );
  }

  if (formField.type === "textarea") {
    return (
      <div className={className}>
        <label className="form-label">{formField.label}</label>
        <textarea {...props} className="form-control"></textarea>
        {error && <p className="text-danger">{error}</p>}
      </div>
    );
  }

  return (
    <div className={className}>
      <FormInput
        options={formField.options}
        defaultValue={formField.defaultValue}
        disabled={formField.disabledFn?.(schema)}
        defaultToToday={formField.defaultToToday}
        {...formFieldProps}
        {...props}
        error={error}
      />
    </div>
  );
};

export default FormFieldInput;
