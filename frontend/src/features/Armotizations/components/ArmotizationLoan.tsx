import { useState } from "react";
import useLoanArmotization from "../hooks/useLoanArmotization";
import ArmotizationDataTable from "./ArmotizationDataTable";

interface ArmotizationLoanProps {
  setLoanId: (id: number) => void;
}

/**
 * `ArmotizationLoan` is a UI component for fetching and displaying a loan's amortization schedule.
 *
 * It allows users to:
 * - Input a loan ID
 * - Trigger the retrieval of amortization data associated with that loan
 * - Display the results in a data table
 *
 * It uses the `useLoanArmotization` hook to handle input changes and fetch data.
 *
 * @param {Object} props - Component props.
 * @param {(id: number) => void} props.setLoanId - A callback function to set the loan ID externally (e.g., for parent state).
 *
 * @returns {JSX.Element} The rendered `ArmotizationLoan` component with an input field, submit button, and amortization table.
 *
 * @example
 * <ArmotizationLoan setLoanId={(id) => setSelectedLoanId(id)} />
 */
const ArmotizationLoan = ({ setLoanId }: ArmotizationLoanProps) => {
  const [armotizationId, setArmotizationId] = useState<number | undefined>();
  const { armotization, fetchArmotization } = useLoanArmotization();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoanId(Number(event.target.value));

    const value = Number(event.target.value);
    if (isNaN(value)) return;

    setArmotizationId(value);
  };

  return (
    <>
      <div className="row mx-0 pb-3">
        <div className="col-lg-10">
          <input
            type="number"
            placeholder="Id préstamo"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-2">
          <button
            className="btn btn-accent w-100 ms-3"
            onClick={() => armotizationId && fetchArmotization(armotizationId)}
          >
            Ok
          </button>
        </div>
      </div>
      <div>
        <ArmotizationDataTable armotization={armotization || []} />
      </div>
    </>
  );
};

export default ArmotizationLoan;
