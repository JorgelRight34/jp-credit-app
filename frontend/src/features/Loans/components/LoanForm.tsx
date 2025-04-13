import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import useNewLoan from "../hooks/useNewLoan";
import ProfilesDataList from "../../Profiles/components/ProfilesDataList";
import { loanFormFields, LoanFormValues, schema } from "../lib/constants";
import { renderFormInputs } from "../../../utils/formUtils";
import EntityFormLayout from "../../../common/EntityFormLayout";

const LoanForm = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [onSubmit] = useNewLoan();

  const renderFormInputsSlice = (start: number, end: number) =>
    renderFormInputs(loanFormFields, start, end, register, errors);

  const handleOnSubmit = async (data: LoanFormValues) => {
    reset();
    await onSubmit(data);
  };

  return (
    <EntityFormLayout onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="col-lg-3">{renderFormInputsSlice(0, 3)}</div>
      <div className="col-lg-3">{renderFormInputsSlice(3, 6)}</div>
      <div className="col-lg-3">
        <div className="mb-3">
          <label className="form-label">Cliente</label>
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
          <label className="form-label">Agente</label>
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
      <div className="col-lg-3">
        <div className="mb-3">
          <label className="form-label" htmlFor="state">
            Estado
          </label>
          <select id="state" className="form-select" {...register("status")}>
            <option value="inactive">Inactivo</option>
            <option value="notified">Notificado</option>
            <option value="punished">Castigado</option>
            <option value="legal">Legal</option>
            <option value="judicial">Judicial</option>
            <option value="agreement">Acuerdo</option>
          </select>
        </div>
      </div>
    </EntityFormLayout>
  );
};

export default LoanForm;
