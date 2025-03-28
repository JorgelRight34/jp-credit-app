import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  collateralConditionsOptions,
  collateralFormDefaultValues,
  CollateralFormValues,
  collateralsFormFields,
  collateralStatusOptions,
  schema,
} from "../lib/constants";
import useNewCollateral from "../hooks/useNewCollateral";
import { renderFormInputs } from "../../../utils/formUtils";
import useEditCollateral from "../hooks/useEditCollateral";
import useDeleteCollateral from "../hooks/useDeleteCollateral";
import ProfilesDataList from "../../Profiles/components/ProfilesDataList";
import { useNavigate } from "react-router";
import useUploadFile from "../../../hooks/useUploadFile";
import FormInput from "../../../common/FormInput";
import EntityFormLayout from "../../../common/EntityFormLayout";
import { toTitleCase } from "../../../utils/utils";

interface CollateralFormProps {
  edit?: number;
  defaultValues?: CollateralFormValues;
}

const CollateralForm = ({
  defaultValues = collateralFormDefaultValues,
  edit,
}: CollateralFormProps) => {
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });
  const [onSubmit] = useNewCollateral();
  const [onEdit] = useEditCollateral();
  const [onDelete] = useDeleteCollateral();
  const { handleOnFileChange, uploadFile } = useUploadFile();
  const navigate = useNavigate();

  const renderFormInputsSlice = (start: number, end: number) =>
    renderFormInputs(collateralsFormFields, start, end, register, errors);

  const handleOnSubmit = async (data: CollateralFormValues) => {
    if (edit) {
      await onEdit(data, edit);
    } else {
      const response = await onSubmit(data);
      uploadFile(`collaterals/${response.id}/photo`);
      reset();
    }
  };

  const handleOnDelete = async () => {
    await onDelete(edit);
    navigate("/collaterals");
  };

  return (
    <EntityFormLayout
      onSubmit={handleSubmit(handleOnSubmit)}
      onDelete={handleOnDelete}
      allowDelete={edit ? true : false}
    >
      <div className="col-lg-4">{renderFormInputsSlice(0, 4)}</div>
      <div className="col-lg-4">
        <div className="mb-3">
          <label className="form-label" htmlFor="state">
            State
          </label>
          <select id="state" className="form-select" {...register("state")}>
            {collateralStatusOptions.map((status) => (
              <option value={status}>{toTitleCase(status)}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="condition">
            Condition
          </label>
          <select
            id="condition"
            className="form-select"
            {...register("condition")}
          >
            {collateralConditionsOptions.map((option) => (
              <option value={option}>{toTitleCase(option)}</option>
            ))}
          </select>
        </div>
        {!edit && (
          <>
            <div className="mb-3">
              <label className="form-label">Client</label>
              <Controller
                name="clientId"
                control={control}
                render={({ field }) => (
                  <ProfilesDataList
                    error={errors.clientId?.message}
                    role="client"
                    {...field}
                  />
                )}
              />
            </div>
            <div className="mb-3">
              <FormInput
                label="Loan Id"
                type="number"
                error={errors.loanId?.message}
                {...register("loanId")}
              />
            </div>
          </>
        )}
      </div>
      <div className="col-lg-4">
        <div className="mb-3">
          <FormInput
            label="Photo"
            name="photo"
            type="file"
            onChange={handleOnFileChange}
          />
        </div>
      </div>
    </EntityFormLayout>
  );
};

export default CollateralForm;
