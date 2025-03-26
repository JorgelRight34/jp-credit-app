import useLoanArmotization from "../hooks/useLoanArmotization";
import ArmotizationDataTable from "./ArmotizationDataTable";

interface ArmotizationLoanProps {
  setLoanId: (id: number) => void;
}

const ArmotizationLoan = ({ setLoanId }: ArmotizationLoanProps) => {
  const { armotization, fetchArmotization, handleOnChange } =
    useLoanArmotization();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoanId(Number(event.target.value));
    handleOnChange(event);
  };

  return (
    <>
      <div className="row mx-0 pb-3">
        <div className="col-lg-10">
          <input
            type="number"
            placeholder="Loan Id"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-2">
          <button
            className="btn btn-accent w-100 ms-3"
            onClick={fetchArmotization}
          >
            Submit
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
