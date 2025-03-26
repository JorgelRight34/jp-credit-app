import api from "../../../api";
import { useEffect, useState } from "react";
import { Transaction } from "../../../models/transaction";

const useTransaction = (id: number) => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [error, setError] = useState(false);

  const fetchTransaction = () => {
    api
      .get(`transactions/${id}`)
      .then((res) => setTransaction(res.data))
      .catch(() => setError(true));
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  return { transaction, error };
};

export default useTransaction;
