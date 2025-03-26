import useLoanArmotization from "../hooks/useLoanArmotization";
import ArmotizationDataTable from "./ArmotizationDataTable";

const ArmotizationLoan = () => {
  const { armotization, fetchArmotization, handleOnChange } =
    useLoanArmotization();

  return (
    <>
      <div className="row mx-0 pb-3">
        <div className="col-lg-10">
          <input
            type="number"
            placeholder="Loan Id"
            className="form-control"
            onChange={handleOnChange}
          />
        </div>
        <div className="col-lg-2">
          <button className="btn btn-accent ms-3" onClick={fetchArmotization}>
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
