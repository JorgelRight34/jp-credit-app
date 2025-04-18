import useNewLoan from "../hooks/useNewLoan";
import { loanFormFields, LoanFormValues, schema } from "../lib/constants";
import useEditLoan from "../hooks/useEditLoan";
import { Loan } from "../../../models/loan";
import EntityForm from "../../../common/EntityForm/EntityForm";
import { toast } from "react-toastify";

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
  const [onSubmit] = useNewLoan();
  const [onEdit] = useEditLoan();

  const handleOnSubmit = async (data: LoanFormValues) => {
    const response = await (edit ? onEdit(data, edit.id) : onSubmit(data));
    if (response) {
      toast.success(`El préstamo ha sido guardado exitosamente.`);
    }
  };

  return (
    <EntityForm<Loan, LoanFormValues>
      onSubmit={handleOnSubmit}
      formFields={loanFormFields}
      defaultValues={defaultValues}
      schema={schema}
      columns={4}
      rows={3}
      edit={edit}
      resetValues={edit ? false : true}
    />
  );
};

export default LoanForm;
