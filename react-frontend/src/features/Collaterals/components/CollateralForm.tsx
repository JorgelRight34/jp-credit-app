import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  collateralFormDefaultValues,
  CollateralFormValues,
  collateralsFormFields,
  schema,
} from "../lib/constants";
import useNewCollateral from "../hooks/useNewCollateral";
import { renderFormInputs } from "../../../utils/formUtils";
import useEditCollateral from "../hooks/useEditCollateral";
import useDeleteCollateral from "../hooks/useDeleteCollateral";
import ProfilesDataList from "../../Profiles/components/ProfilesDataList";
import { useNavigate } from "react-router";

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
  const [onEdit] = useEditCollateral(edit);
  const [onDelete] = useDeleteCollateral(edit);
  const navigate = useNavigate();

  const renderFormInputsSlice = (start: number, end: number) =>
    renderFormInputs(collateralsFormFields, start, end, register, errors);

  const handleOnSubmit = async (data: CollateralFormValues) => {
    if (edit) {
      await onEdit(data);
    } else {
      await onSubmit(data);
    }
    reset();
  };

  const handleOnDelete = async () => {
    await onDelete();
    navigate("/collaterals");
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="row mx-0 pt-3">
          <div className="col-lg-6">{renderFormInputsSlice(0, 4)}</div>
          <div className="col-lg-6">
            {renderFormInputsSlice(4, 8)}
            <div className="mb-3">
              <label className="form-label" htmlFor="state">
                State
              </label>
              <select id="state" className="form-select" {...register("state")}>
                <option value="good">good</option>
                <option value="bad">bad</option>
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
                <option value="good">Good</option>
                <option value="old">Old</option>
              </select>
            </div>
            {!edit && (
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
            )}
          </div>
          <button type="submit" className="btn btn-accent w-100">
            Submit
          </button>
          {edit && (
            <button
              type="button"
              className="btn btn-danger w-100 mt-3"
              onClick={handleOnDelete}
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default CollateralForm;
