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

interface TransactionFormProps {
  fixedLoan?: Loan;
}

const TransactionForm = ({ fixedLoan }: TransactionFormProps) => {
  const [onSubmit] = useNewTransaction();

  const transactionFormFields: FormField<Transaction>[] = [
    {
      name: "value",
      label: "Monto",
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
      defaultValue: String(fixedLoan?.id),
      min: "1",
    },
    {
      name: "type",
      label: "Tipo",
      type: "select",
      options: transactionTypesOptions,
    },
  ];

  const handleOnSubmit = async (data: TransactionFormValues) => {
    await onSubmit(data);
    toast.success("¡La transacción se ha creado exitosamente!");
  };

  return (
    <>
      <EntityForm<Transaction, TransactionFormValues>
        columns={2}
        rows={3}
        formFields={transactionFormFields}
        schema={schema}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

export default TransactionForm;
