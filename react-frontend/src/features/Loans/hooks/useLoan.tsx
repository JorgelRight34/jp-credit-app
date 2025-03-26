import { useEffect, useState } from "react";
import { Loan } from "../../../models/loan";
import api from "../../../api";

const useLoan = (id: string) => {
  const [loan, setLoan] = useState<Loan | undefined>();
  const [error, setError] = useState(false);

  const fetchLoan = () => {
    api
      .get(`loans/${id}`)
      .then((res) => setLoan(res.data))
      .catch(() => setError(true));
  };

  useEffect(() => {
    fetchLoan();
  }, []);

  return { loan, error };
};

export default useLoan;
