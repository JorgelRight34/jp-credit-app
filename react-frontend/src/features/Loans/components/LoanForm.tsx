import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import useNewLoan from "../hooks/useNewLoan";
import ClientsDataList from "../../Clients/components/ClientsDataList";
import { loanFormFields, schema } from "../lib/constants";
import useClients from "../../Clients/hooks/useClients";
import useLoanOfficers from "../../Clients/hooks/useLoanOfficers";
import { renderFormInputs } from "../../../utils/formUtils";

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
  useClients(); // Load clients
  useLoanOfficers();

  const renderFormInputsSlice = (start: number, end: number) =>
    renderFormInputs(loanFormFields, start, end, register, errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row mx-0 pt-3">
        <div className="col-lg-4">{renderFormInputsSlice(0, 3)}</div>
        <div className="col-lg-4">{renderFormInputsSlice(3, 6)}</div>
        <div className="col-lg-4">
          <div className="mb-3">
            <label className="form-label">Client</label>
            <Controller
              name="clientId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <ClientsDataList
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
                <ClientsDataList
                  role="loanOfficer"
                  error={errors?.clientId?.message}
                  {...field}
                />
              )}
            />
          </div>
          {renderFormInputsSlice(6, 7)}
        </div>
        <button
          type="submit"
          className="btn btn-accent w-100"
          onClick={() => console.log(errors)}
        >
          Submit loan
        </button>
      </div>
    </form>
  );
};

export default LoanForm;
