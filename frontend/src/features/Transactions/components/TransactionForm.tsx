import useNewTransaction from "../hooks/useNewTransaction";
import EntityFormLayout from "../../../common/EntityForm/EntityFormLayout";
import {
  schema,
  transactionFormFields,
  transactionTypesOptions,
} from "../lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { renderFormInputs } from "../../../utils/formUtils";
import ProfilesDataList from "../../Profiles/components/ProfilesDataList";
import FormInput from "../../../common/EntityForm/FormInput";
import { useEffect, useMemo } from "react";
import useLoan from "../../Loans/hooks/useLoan";
import TransactionFormDetails from "./TransactionFormDetails";

const TransactionForm = () => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [onSubmit] = useNewTransaction();
  const { loan, fetchLoan } = useLoan();
  const amount = watch("value");
  const loanId = watch("loanId"); // Watch for loan id changes
  const isProfilesDataListDisabled = useMemo(
    // If there's not a loanId then don't allow user to select a payer
    () => !loanId && loanId !== 0,
    [loanId]
  );
  const profilesDataList = useMemo(() => {
    // Return a list of the profiles that can make the payment for the given loan
    return loan
      ? [
          { ...loan.client, label: "Cliente" },
          ...(loan.guarantor ? [{ ...loan.guarantor, label: "Garante" }] : []),
        ]
      : [];
  }, [loan]);

  useEffect(() => {
    if (loanId && loanId !== 0) fetchLoan(String(loanId));
  }, [loanId]);

  return (
    <>
      <EntityFormLayout onSubmit={handleSubmit(onSubmit)}>
        <div className="row p-3 mx-0">
          {/* First column */}
          <div className="col-lg-4">
            {/* Other inputs */}
            {renderFormInputs(transactionFormFields, 0, 2, register, errors)}
          </div>
          <div className="col-lg-4">
            {/* Clients data list */}
            <div className="mb-3">
              <label className="form-label">Cliente</label>
              <Controller
                name="payerId"
                control={control}
                render={({ field }) => (
                  <ProfilesDataList
                    role="client"
                    data={profilesDataList}
                    isDisabled={isProfilesDataListDisabled}
                    {...field}
                    error={errors.payerId?.message}
                  />
                )}
              />
            </div>
            {/* Loan */}
            <div className="mb-3">
              <FormInput
                label="Id Préstamo"
                type="number"
                error={errors.loanId?.message}
                {...register("loanId")}
              />
            </div>
          </div>
          {/* Second column */}
          <div className="col-lg-4">
            {/* Transaction types */}
            <div className="mb-3">
              <label className="form-label">Tipo</label>
              <select
                className="form-select"
                id="type"
                {...register("type")}
                required
              >
                {transactionTypesOptions.map((option) => (
                  <option key={option[0]} value={option[0]}>
                    {option[1]}
                  </option>
                ))}
              </select>
              {errors.loanId?.message}
            </div>
          </div>
        </div>
        <div className="row mx-0">
          {loan && amount && (
            <TransactionFormDetails loan={loan} amount={Number(amount)} />
          )}
        </div>
      </EntityFormLayout>
    </>
  );
};

export default TransactionForm;
