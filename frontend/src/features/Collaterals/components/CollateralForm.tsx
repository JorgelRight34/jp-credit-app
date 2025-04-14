import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  collateralConditionsOptions,
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
import { getFirstAndLastName } from "../../../utils/utils";
import { Collateral } from "../../../models/collateral";

interface CollateralFormProps {
  edit?: Collateral;
  defaultValues?: CollateralFormValues;
}

const CollateralForm = ({ defaultValues, edit }: CollateralFormProps) => {
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
      await onEdit(data, edit.id);
      navigate(0);
    } else {
      const response = await onSubmit(data);
      uploadFile(`collaterals/${response.id}/photo`);
      reset();
    }
  };

  const handleOnDelete = async () => {
    if (!edit) return;
    await onDelete(edit.id);
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
            Estado
          </label>
          <select
            id="state"
            className="form-select"
            defaultValue={defaultValues?.status}
            {...register("status")}
          >
            {collateralStatusOptions.map((option) => (
              <option key={option[0]} value={option[0]}>
                {option[1]}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="condition">
            Condición
          </label>
          <select
            id="condition"
            className="form-select"
            defaultValue={defaultValues?.condition}
            {...register("condition")}
          >
            {collateralConditionsOptions.map((option) => (
              <option key={option[0]} value={option[0]}>
                {option[1]}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Cliente</label>
          {edit ? (
            <p className="text-muted mb-0">
              {getFirstAndLastName(edit.client)}
            </p>
          ) : (
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
          )}
        </div>
        <div className="mb-3">
          <FormInput
            label="Id Préstamo"
            type="number"
            disabled={edit ? true : false}
            error={errors.loanId?.message}
            {...register("loanId")}
          />
        </div>
      </div>
      <div className="col-lg-4">
        <div className="mb-3">
          <FormInput
            label="Foto"
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
