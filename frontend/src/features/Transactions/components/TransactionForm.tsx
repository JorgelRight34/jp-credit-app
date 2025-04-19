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
      name: "payerId",
      label: "Cliente",
      profileDataList: true,
      profileRole: "user",
      fixedWatchedValue: fixedLoan?.id,
      watch: "loanId",
      disabledWhen: (value) =>
        value === "" || value === 0 || value == undefined || value === null,
    },
    {
      name: "loanId",
      label: "Id Préstamo",
      type: "number",
      defaultValue: String(fixedLoan?.id) || null,
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
    },
  ];

  const handleOnSubmit = async (data: TransactionFormValues) => {
    await onSubmit(data);
    toast.success("¡La transacción se ha creado exitosamente!");
  };

  return (
    <>
      <EntityForm<Transaction, TransactionFormValues>
        columns={3}
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
