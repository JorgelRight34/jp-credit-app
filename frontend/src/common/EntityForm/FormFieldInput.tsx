import { FieldValues } from "react-hook-form";
import { FormField } from "../../models/formField";
import MultipleFilesInput from "../ui/MultipleFilesInput";
import FormInput from "./FormInput";
import { ZodType } from "zod";
import { ApiFile } from "../../models/apiFile";

interface FormFieldInputProps<TData> {
  schema: ZodType<FieldValues>;
  formField: FormField<TData>;
  files?: File[];
  filesMaxLength?: number;
  watch: (name: keyof TData) => TData[keyof TData];
  defaultFileSources?: ApiFile[];
  setFiles?: (files: File[] | ((prev: File[]) => File[])) => void;
  setDefaultFileSources?: (
    files: ApiFile[] | ((prev: ApiFile[]) => ApiFile[])
  ) => void;
  className?: string;
  error?: string;
  edit?: TData;
}

const FormFieldInput = <TData,>({
  formField,
  files,
  edit,
  watch,
  defaultFileSources,
  setDefaultFileSources,
  filesMaxLength = 10,
  setFiles,
  className = "",
  error,
  ...props
}: FormFieldInputProps<TData>) => {
  const formFieldProps = {
    name: formField.name,
    type: formField.type,
    min: formField.min,
    required: formField.required,
    step: formField.step,
    multiple: formField.multiple,
    defaultValue: formField.defaultValue,
  };

  const watchedValue = formField.watchedValue
    ? watch(formField.watchedValue)
    : undefined;
  const disabled = formField.disabledWhen?.(watch) ?? false;
  const isFileInput = formField.type === "file" && files && setFiles;

  if ((!formField.showOnEdit && edit) || formField.show === false) return <></>;

  if (formField.profileDataList && edit) {
    return (
      <>
        <label className="form-label" htmlFor={formField.name}>
          {formField.label}
        </label>
        <p className="text-muted mb-0">{formField?.showOnEditFn?.(edit)}</p>
      </>
    );
  }

  return (
    <div className={className}>
      <label className="form-label" htmlFor={formField.name}>
        {isFileInput ? (
          <>Archivos ({files.length + (defaultFileSources?.length || 0)})</>
        ) : (
          <>
            {formField.label}{" "}
            {formField.required !== false ? (
              <span className="text-red-500"> *</span>
            ) : (
              ""
            )}
          </>
        )}
      </label>
      {isFileInput ? (
        <MultipleFilesInput
          className="w-full"
          setFiles={setFiles}
          setDefaultFileSources={setDefaultFileSources}
          defaultFileSources={defaultFileSources}
          {...{ disabled: disabled }}
          maxLength={filesMaxLength}
        />
      ) : (
        <FormInput<TData>
          formField={formField}
          disabled={disabled}
          watchedValue={watchedValue as string | number}
          {...formFieldProps}
          {...props}
        />
      )}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default FormFieldInput;
