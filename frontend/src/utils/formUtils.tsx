import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import FormInput from "../common/EntityForm/FormInput";
import { FormField } from "../models/formField";

export const renderFormInputs = <TData,>(
  array: FormField<TData>[],
  start: number,
  end: number,
  register: UseFormRegister<any>,
  errors: FieldErrors<FieldValues>
) => {
  return array.slice(start, end).map((field: FormField<TData>) => (
    <div className="mb-3" key={field.name}>
      <FormInput
        {...field}
        {...register(field.name as keyof typeof register)}
        error={errors[field.name as keyof FieldValues]?.message as string}
      />
    </div>
  ));
};
