import SearchBtn from "../../../common/ui/SearchBtn";

interface ArmotizationFormProps {
  handleOnChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

/**
 * `ArmotizationForm` is a reusable form component for collecting amortization details.
 *
 * It includes input fields for:
 * - Principal balance
 * - Annual interest rate
 * - Payment frequency (monthly or annually)
 * - Number of payments
 *
 * The form calls `onSubmit` when submitted and `handleOnChange` for every input or select change.
 *
 * @param {Object} props - Component props.
 * @param {(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void} props.handleOnChange -
 *        Callback fired when an input/select value changes.
 * @param {(event: React.FormEvent<HTMLFormElement>) => void} props.onSubmit -
 *        Callback fired when the form is submitted.
 *
 * @returns {JSX.Element} The rendered amortization form.
 *
 * @example
 * <ArmotizationForm
 *   handleOnChange={handleChange}
 *   onSubmit={handleFormSubmit}
 * />
 */
const ArmotizationForm = ({
  handleOnChange,
  onSubmit,
}: ArmotizationFormProps) => {
  return (
    <form className="row mx-0 pb-3" onSubmit={onSubmit}>
      <div className="col-lg-2 ps-0">
        <input
          className="form-control"
          name="principalBalance"
          id="principalBalance"
          placeholder="Balance"
          onChange={handleOnChange}
        />
      </div>
      <div className="col-lg-2">
        <input
          className="form-control"
          name="annualInterestRate"
          id="annualInterestRate"
          placeholder="Tasa de Interés"
          onChange={handleOnChange}
        />
      </div>
      <div className="col-lg-3">
        <select
          className="form-select"
          name="paymentFrequency"
          id="paymentFrequency"
          onChange={handleOnChange}
        >
          <option>Frecuencia de Pago</option>
          <option value="12">Mensual</option>
          <option value="1">Anual</option>
        </select>
      </div>
      <div className="col-lg-3">
        <input
          placeholder="No. Pagos"
          className="form-control"
          name="numberOfPayments"
          id="numberOfPayments"
          type="number"
          onChange={handleOnChange}
        />
      </div>
      <div className="col-lg-2 pe-0">
        <SearchBtn type="submit" />
      </div>
    </form>
  );
};

export default ArmotizationForm;
