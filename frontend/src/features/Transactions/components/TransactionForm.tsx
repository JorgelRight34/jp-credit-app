import useNewTransaction from "../hooks/useNewTransaction";
import EntityFormLayout from "../../../common/EntityFormLayout";
import { Transaction } from "../../../models/transaction";
import { schema, transactionFormFields } from "../lib/utils";

const TransactionForm = () => {
  const [onSubmit] = useNewTransaction();

  return (
    <>
      <EntityFormLayout<Transaction>
        onSubmit={onSubmit}
        schema={schema}
        formFields={transactionFormFields}
        columns={3}
        rows={2}
        resetValues={true}
      />
    </>
  );
};

export default TransactionForm;
