import AccentBtn from "./AccentBtn";
import { FormField } from "../models/formField";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";
import { Controller, FieldValues, useForm } from "react-hook-form";
import FormInput from "./FormInput";
import ProfilesDataList from "../features/Profiles/components/ProfilesDataList";
import useUploadFile from "../hooks/useUploadFile";
import { useMemo } from "react";

interface EntityFormLayoutProps<TData> {
  allowDelete?: boolean;
  onDelete?: () => void;
  onSubmit: (data: any) => void;
  edit?: TData;
  formFields: FormField<TData>[];
  schema: ZodType<FieldValues, any, any>;
  defaultValues?: Record<string, string | number | undefined | null>;
  rows: number;
  columns: number;
  resetValues?: boolean;
  uploadFileUrl?: string;
}

/**
 * A layout component for entity forms that wraps its children with a form element.
 * It provides a submit button and an optional delete button.
 * @component
 * @param {EntityFormLayoutProps} props - The props for the entity form layout component.
 * @param {ReactNode} props.children - The content to be displayed inside the layout.
 * @param {boolean} [props.allowDelete] - A boolean indicating whether the delete button should be shown.
 * @param {function} [props.onDelete] - A function to be called when the delete button is clicked.
 * @param {function} props.onSubmit - A function to be called when the form is submitted.
 * @returns {JSX.Element} The rendered entity form layout component.
 */
const EntityFormLayout = <TData,>({
  allowDelete,
  columns,
  rows,
  schema,
  formFields,
  defaultValues,
  edit,
  resetValues = true,
  uploadFileUrl,
  onDelete,
  onSubmit,
}: EntityFormLayoutProps<TData>) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });
  const { handleOnFileChange, uploadFile } = useUploadFile();

  const renderFormInputsSlice = (
    start: number,
    end: number,
    direction: "col" | "row" = "col"
  ) => {
    return formFields.slice(start, end).map((formField: FormField<TData>) => {
      if (edit && formField.showOnEdit === false) return;
      if (formField.showOnNewRow && direction === "col") return;
      if (!formField.showOnNewRow && direction === "row") return;

      return renderFormInput(formField);
    });
  };

  const renderFormInput = (formField: FormField<TData>) => {
    const key = formField.name;
    const className = "mb-3";
    if (formField.type === "file") {
      return (
        <div className={className} key={key}>
          {formField.type === "file" && (
            <FormInput
              label={formField.label}
              name={formField.name}
              type="file"
              onChange={handleOnFileChange}
            />
          )}
        </div>
      );
    }

    if (formField.type === "select") {
      return (
        <div className={className} key={key}>
          {formField.type === "select" && (
            <>
              <label className="form-label" htmlFor={formField.name}>
                {formField.label}
              </label>
              <select
                className="form-select"
                {...register(formField.name as keyof typeof register)}
              >
                {formField.options?.map((option) => (
                  <option key={option[0]} value={option[0]}>
                    {option[1]}
                  </option>
                ))}
              </select>
              {errors[formField.name as keyof typeof errors]?.message}
            </>
          )}
        </div>
      );
    }

    if (formField.profileDataList) {
      return (
        <div className={className} key={key}>
          {edit ? (
            <>
              <label className="form-label" htmlFor={formField.name}>
                {formField.label}
              </label>
              <p className="text-muted mb-0">
                {formField?.showOnEditFn?.(edit)}
              </p>
            </>
          ) : (
            <>
              <label className="form-label">{formField.label}</label>
              <Controller
                control={control}
                {...register(formField.name as keyof typeof register)}
                render={({ field }) => (
                  <ProfilesDataList
                    role={formField.profileRole || "client"}
                    error={errors?.clientId?.message as string}
                    {...field} // This binds react-select to React Hook Form
                  />
                )}
              />
            </>
          )}
        </div>
      );
    }

    return (
      <div className={className} key={key}>
        <FormInput
          defaultToToday={formField.defaultToToday}
          {...formField}
          {...register(formField.name as keyof typeof register)}
          error={errors[formField.name as keyof FieldValues]?.message as string}
        />
      </div>
    );
  };

  const handleOnSubmit = async (data: FieldValues) => {
    await onSubmit(data);
    if (resetValues) reset();
    if (uploadFileUrl) {
      await onSubmit(data);
      await uploadFile(uploadFileUrl);
    }
  };

  const rowFormFields = useMemo(
    () => formFields.filter((field) => field.showOnNewRow),
    [formFields]
  );

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="row mx-0 pt-3">
        {Array(columns)
          .fill(null)
          .map((_, index) => (
            <div className="col" key={`col-${index}`}>
              {renderFormInputsSlice(rows * index, rows * index + rows, "col")}
            </div>
          ))}
      </div>
      {rowFormFields.map((field, index) => (
        <div className="row mx-0" key={index}>
          {renderFormInput(field)}
        </div>
      ))}
      <div className="d-flex">
        <AccentBtn type="submit" className="w-100">
          Ok
        </AccentBtn>
        {allowDelete && (
          <AccentBtn type="button" className="w-100 ms-3" onClick={onDelete}>
            Eliminar
          </AccentBtn>
        )}
      </div>
    </form>
  );
};

export default EntityFormLayout;
