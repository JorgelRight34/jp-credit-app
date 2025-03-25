import Select from "react-select";
import useLoans from "../hooks/useLoans";

interface LoansDataListProps {
  error?: string;
}

const LoansDataList = ({ error, ...props }: LoansDataListProps) => {
  const [data] = useLoans();

  return (
    <>
      <Select
        options={data?.map((loan) => ({
          value: loan.id,
          label: String(loan.id),
        }))}
        required
        {...props}
      />
      {error && <p className="text-danger">{error}</p>}
    </>
  );
};

export default LoansDataList;
