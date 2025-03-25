import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { schema, transactionFormFields } from "../lib/utils";
import useNewTransaction from "../hooks/useNewTransaction";
import { renderFormInputs } from "../../../utils/formUtils";
import ClientsDataList from "../../Clients/components/ClientsDataList";
import LoansDataList from "../../Loans/components/LoansDataList";

const TransactionForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [onSubmit] = useNewTransaction();

  const renderTransactionFormInputs = (start: number, end: number) =>
    renderFormInputs(transactionFormFields, start, end, register, errors);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mx-0 pt-3">
          <div className="col-lg-4">{renderTransactionFormInputs(0, 2)}</div>
          <div className="col-lg-4">
            <div className="mb-3">
              <label className="form-label">Client</label>
              <Controller
                name="payerId"
                control={control}
                render={({ field }) => (
                  <ClientsDataList
                    role="client"
                    {...field}
                    error={errors.payerId?.message}
                  />
                )}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Loan Id</label>
              <Controller
                name="loanId"
                control={control}
                render={({ field }) => (
                  <LoansDataList error={errors.loanId?.message} {...field} />
                )}
              />
              {errors.loanId?.message}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mb-3">
              <label className="form-label">Type</label>
              <select
                className="form-select"
                id="type"
                {...register("type")}
                required
              >
                <option value="DS">DS | Desembolso</option>
                <option value="PC">PC | Pago Cuota</option>
                <option value="NC">NC | Nota de Crédito</option>
                <option value="ND">ND | Nota de Débito</option>
              </select>
              {errors.loanId?.message}
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-accent w-100">
          Submit
        </button>
      </form>
    </>
  );
};

export default TransactionForm;
