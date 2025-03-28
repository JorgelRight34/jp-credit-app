import api from "../../../api";
import { useEffect, useState } from "react";
import { Transaction } from "../../../models/transaction";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const useTransaction = (id: number) => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [error, setError] = useState(false);
  const { transactions } = useSelector(
    (state: RootState) => state.transactions
  );

  const fetchTransaction = () => {
    // Try to find item in memory
    const found = transactions.find((transaction) => transaction.id === id);
    if (found) {
      setTransaction(found);
      return;
    }

    // If item not in transactions then fetch it
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
