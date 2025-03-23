import { useEffect, useState } from "react";
import { Loan } from "../../../models/loan";
import api from "../../../api";

const useLoans = () => {
  const [loans, setLoans] = useState<Loan[]>([]);

  const fetchLoans = async () => {
    const response = await api.get("loans");
    setLoans(
      response.data.map((loan: Loan) => {
        loan.createdAt = new Date(loan.createdAt);
        return loan;
      })
    );
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return [loans];
};

export default useLoans;
