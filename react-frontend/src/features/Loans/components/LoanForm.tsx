import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import useNewLoan from "../hooks/useNewLoan";
import ProfilesDataList from "../../Profiles/components/ProfilesDataList";
import { loanFormFields, schema } from "../lib/constants";
import { renderFormInputs } from "../../../utils/formUtils";
import EntityFormLayout from "../../../common/EntityFormLayout";

const LoanForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [onSubmit] = useNewLoan();

  const renderFormInputsSlice = (start: number, end: number) =>
    renderFormInputs(loanFormFields, start, end, register, errors);

  return (
    <EntityFormLayout onSubmit={handleSubmit(onSubmit)}>
      <div className="col-lg-4">{renderFormInputsSlice(0, 3)}</div>
      <div className="col-lg-4">
        {renderFormInputsSlice(3, 6)}
        <div className="mb-3">
          <label className="form-label" htmlFor="state">
            Status
          </label>
          <select id="state" className="form-select" {...register("status")}>
            <option value="inactive">Inactive</option>
            <option value="active">Active</option>
          </select>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="mb-3">
          <label className="form-label">Client</label>
          <Controller
            name="clientId"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <ProfilesDataList
                role="client"
                error={errors?.clientId?.message}
                {...field} // This binds react-select to React Hook Form
              />
            )}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Loan Officer</label>
          <Controller
            name="loanOfficerId"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <ProfilesDataList
                role="loanOfficer"
                error={errors?.clientId?.message}
                {...field}
              />
            )}
          />
        </div>
        {renderFormInputsSlice(6, 7)}
      </div>
    </EntityFormLayout>
  );
};

export default LoanForm;
