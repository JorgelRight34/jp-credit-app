import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import useNewLoan from "../hooks/useNewLoan";
import ProfilesDataList from "../../Profiles/components/ProfilesDataList";
import { loanFormFields, LoanFormValues, schema } from "../lib/constants";
import { renderFormInputs } from "../../../utils/formUtils";
import EntityFormLayout from "../../../common/EntityFormLayout";
import useEditLoan from "../hooks/useEditLoan";
import { Loan } from "../../../models/loan";
import { getFirstAndLastName } from "../../../utils/utils";
import { useNavigate } from "react-router";

interface LoanFormDefaultProps {
  defaultValues?: LoanFormValues;
  edit?: Loan;
}

/**
 * LoanForm Component
 *
 * A form component for creating or editing loan entries with validation and submission handling.
 *
 * @component
 * @example
 * return <LoanForm />
 *
 * @description
 * This component provides a multi-column form layout for loan data entry, including:
 * - Client and loan officer selection via custom dropdowns
 * - Loan details input fields
 * - Status selection dropdown
 * - Form validation using Zod schema
 * - Submission handling with automatic form reset
 *
 * The form is divided into 4 columns (3-3-3-3 layout) with fields distributed logically.
 *
 * @returns {React.ReactElement} A form element with controlled inputs and submission handling
 */
const LoanForm = ({ defaultValues, edit }: LoanFormDefaultProps) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });
  const [onSubmit] = useNewLoan();
  const [onEdit] = useEditLoan();
  const navigate = useNavigate();

  const renderFormInputsSlice = (start: number, end: number) =>
    renderFormInputs(loanFormFields, start, end, register, errors);

  const handleOnSubmit = async (data: LoanFormValues) => {
    if (edit) {
      await onEdit(data, edit.id);
      navigate(0);
    } else {
      await onSubmit(data);
      reset();
    }
  };

  return (
    <EntityFormLayout onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="col-lg-3">{renderFormInputsSlice(0, 3)}</div>
      <div className="col-lg-3">{renderFormInputsSlice(3, 6)}</div>
      <div className="col-lg-3">
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
              defaultValue=""
              render={({ field }) => (
                <ProfilesDataList
                  role="client"
                  error={errors?.clientId?.message}
                  {...field} // This binds react-select to React Hook Form
                />
              )}
            />
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Agente</label>
          {edit ? (
            <p className="text-muted mb-0">
              {getFirstAndLastName(edit.loanOfficer)}
            </p>
          ) : (
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
          )}
        </div>

        {renderFormInputsSlice(6, 7)}
      </div>
      <div className="col-lg-3">
        <div className="mb-3">
          <label className="form-label" htmlFor="state">
            Estado
          </label>
          <select
            id="state"
            defaultValue={defaultValues?.status}
            className="form-select"
            {...register("status")}
          >
            <option value="active">Activo</option>
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
