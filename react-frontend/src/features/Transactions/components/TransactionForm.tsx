import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { schema, transactionFormFields } from "../lib/utils";
import useNewTransaction from "../hooks/useNewTransaction";
import { renderFormInputs } from "../../../utils/formUtils";
import ClientsDataList from "../../Profiles/components/ProfilesDataList";
import EntityFormLayout from "../../../common/EntityFormLayout";
import FormInput from "../../../common/FormInput";

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
      <EntityFormLayout onSubmit={handleSubmit(onSubmit)}>
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
            <FormInput
              label="Loan Id"
              type="number"
              error={errors.loanId?.message}
              {...register("loanId")}
            />
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
      </EntityFormLayout>
    </>
  );
};

export default TransactionForm;
