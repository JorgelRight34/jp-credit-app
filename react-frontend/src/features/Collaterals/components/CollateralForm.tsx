import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { collateralsFormFields, schema } from "../lib/constants";
import useNewCollateral from "../hooks/useNewCollateral";
import { renderFormInputs } from "../../../utils/formUtils";

const CollateralForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [onSubmit] = useNewCollateral();

  const renderFormInputsSlice = (start: number, end: number) =>
    renderFormInputs(collateralsFormFields, start, end, register, errors);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mx-0 pt-3">
          <div className="col-lg-6">{renderFormInputsSlice(0, 4)}</div>
          <div className="col-lg-6">
            {renderFormInputsSlice(4, 8)}
            <div className="mb-3">
              <label className="form-label" htmlFor="state">
                State
              </label>
              <select id="state" className="form-select" {...register("state")}>
                <option value="1">1</option>
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
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-accent w-100">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default CollateralForm;
