import { ZodType } from "zod";
import { FormField } from "../../models/formField";
import EntityFormLayout from "./EntityFormLayout";
import { FieldValues, useForm, UseFormWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormFieldInput from "./FormFieldInput";
import { MouseEventHandler, ReactNode, useMemo } from "react";
import { ApiFile } from "../../models/apiFile";

interface EntityFormProps<TData, T extends FieldValues> {
  onDelete?: () => void;
  edit?: TData;
  formFields: FormField<TData>[];
  filesMaxLength?: number;
  onSubmit: (data: T) => Promise<void>;
  schema: ZodType<FieldValues>;
  defaultValues?: Record<string, string | number | undefined | null>;
  rows: number;
  columns: number;
  resetValues?: boolean;
  defaultFileSources?: ApiFile[];
  files?: File[];
  setFiles?: (files: File[] | ((prev: File[]) => File[])) => void;
  setDefaultFileSources?: (
    files: ApiFile[] | ((prev: ApiFile[]) => ApiFile[])
  ) => void;
  extraInfo?: (watch: UseFormWatch<FieldValues>) => ReactNode;
  extraInfoRenderDirection?: "col-start" | "col-end" | "row-start" | "row-end";
}

const EntityForm = <TData, T extends FieldValues>({
  columns,
  rows,
  schema,
  formFields,
  defaultValues,
  edit,
  extraInfo,
  resetValues = true,
  files,
  filesMaxLength = 1,
  defaultFileSources,
  setDefaultFileSources,
  setFiles,
  onDelete,
  onSubmit,
}: EntityFormProps<TData, T>) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const renderFormInputsSlice = (
    start: number,
    end: number,
    direction: "col" | "row" = "col"
  ) => {
    return formFields.slice(start, end).map((formField: FormField<TData>) => {
      if (edit && formField.showOnEdit === false) return;
      if (formField.showOnNewRow && direction === "col") return;
      if (!formField.showOnNewRow && direction === "row") return;

      return renderFormFieldInput(formField);
    });
  };

  const renderFormFieldInput = (formField: FormField<TData>) => {
    return (
      <FormFieldInput<TData>
        watch={watch}
        schema={schema}
        key={formField.name}
        className={"mb-3"}
        formField={formField}
        defaultFileSources={defaultFileSources}
        setDefaultFileSources={setDefaultFileSources}
        {...{ control }}
        {...register(formField.name as keyof typeof register)}
        files={files}
        filesMaxLength={filesMaxLength}
        setFiles={setFiles}
        edit={edit}
        error={errors[formField.name as keyof typeof errors]?.message as string}
      />
    );
  };

  const handleOnSubmit = async (data: FieldValues) => {
    await onSubmit(data as T);

    if (resetValues && defaultValues) {
      reset(defaultValues);
      return;
    }

    if (resetValues) {
      reset(undefined, { keepDirty: true });

      // Force dirty state sync
      setTimeout(() => {
        Object.keys(control._formValues).forEach((name) => {
          setValue(name, control._formValues[name], { shouldDirty: true });
        });
      }, 0);
    }
  };

  const rowFormFields = useMemo(
    () => formFields.filter((field) => field.showOnNewRow),
    [formFields]
  );

  return (
    <EntityFormLayout
      onDelete={onDelete as MouseEventHandler}
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <div className="row mx-0 pt-3">
        {Array(columns)
          .fill(null)
          .map((_, index) => (
            <div className="col" key={`col-${index}`}>
              {renderFormInputsSlice(rows * index, rows * index + rows, "col")}
            </div>
          ))}
      </div>
      {rowFormFields.map((formField, index) => (
        <div className="row mx-0" key={index}>
          {renderFormFieldInput(formField)}
        </div>
      ))}
      {extraInfo && extraInfo(watch)}
    </EntityFormLayout>
  );
};

export default EntityForm;
