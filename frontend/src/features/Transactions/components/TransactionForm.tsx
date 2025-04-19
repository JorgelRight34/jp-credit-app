import useNewTransaction from "../hooks/useNewTransaction";
import {
  schema,
  TransactionFormValues,
  transactionTypesOptions,
} from "../lib/utils";
import { Loan } from "../../../models/loan";
import { toast } from "react-toastify";
import { Transaction } from "../../../models/transaction";
import EntityForm from "../../../common/EntityForm/EntityForm";
import { FormField } from "../../../models/formField";
import TransactionFormDetails from "./TransactionFormDetails";
import { TransactionType } from "../../../models/transactionType";

interface TransactionFormProps {
  fixedLoan?: Loan;
}

const TransactionForm = ({ fixedLoan }: TransactionFormProps) => {
  const [onSubmit] = useNewTransaction();

  const transactionFormFields: FormField<Transaction>[] = [
    {
      name: "value",
      label: "Monto",
      type: "number",
      step: 0.001,
    },
    {
      name: "date",
      label: "Fecha",
      defaultToToday: true,
      type: "date",
    },
    {
      name: "loanId",
      label: "Id Préstamo",
      type: "number",
      defaultValue: fixedLoan?.id === undefined ? null : String(fixedLoan?.id),
    },
    {
      name: "payerId",
      label: "Cliente",
      profileDataList: true,
      profileRole: "user",
      fixedWatchedValue: fixedLoan?.id,
      watchedValue: "loanId",
      disabledWhen: (watch) => {
        const type = watch("type");

        if (type === "DS") return true;
        const loanId = watch("loanId");
        if (
          loanId === "" ||
          loanId === 0 ||
          loanId == undefined ||
          loanId === null
        )
          return true;

        return false;
      },
    },
    {
      name: "type",
      label: "Tipo",
      type: "select",
      options: transactionTypesOptions,
    },
    {
      name: "penaltyRate",
      label: "Penalidad (1-100)%",
      type: "number",
      step: 0.01,
      watchedValue: "type",
      disabledWhen: (watch) => watch("type") === TransactionType.DS,
    },
  ];

  const handleOnSubmit = async (data: TransactionFormValues) => {
    await onSubmit(data);
    toast.success("¡La transacción se ha creado exitosamente!");
  };

  return (
    <>
      <EntityForm<Transaction, TransactionFormValues>
        columns={4}
        rows={2}
        formFields={transactionFormFields}
        schema={schema}
        onSubmit={handleOnSubmit}
        extraInfo={(watch) => (
          <TransactionFormDetails
            className="mb-3"
            amount={watch("value") || 0}
            loanId={watch("loanId")}
          />
        )}
      />
    </>
  );
};

export default TransactionForm;
