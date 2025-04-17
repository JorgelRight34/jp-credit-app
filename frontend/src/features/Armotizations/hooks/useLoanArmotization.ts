import { useEffect, useState } from "react";
import { ArmotizationPayment } from "../../../models/armotizationPayment";
import api from "../../../api";
import { baseUrl } from "../lib/constants";

interface UseLoanArmotizationReturn {
  armotization: ArmotizationPayment[];
  fetchArmotization: (loanId: number) => void;
}

/**
 * Hook to manage loan amortization by loan ID.
 *
 * @returns {
 *   armotization: fetched data,
 *   setArmotizationId: set loan ID manually,
 *   fetchArmotization: fetch data from API,
 *   handleOnChange: input handler for loan ID
 * }
 *
 * @example
 * const { armotization, fetchArmotization } = useLoanArmotization();
 */

const useLoanArmotization = (loanId?: number): UseLoanArmotizationReturn => {
  const [armotization, setArmotization] = useState<ArmotizationPayment[]>([]);

  const fetchArmotization = async (loanId: number) => {
    if (!loanId) return;
    const response = await api.get(`${baseUrl}/loans/${loanId}`);
    setArmotization(response.data);
  };

  useEffect(() => {
    if (loanId) fetchArmotization(loanId);
  }, [loanId]);

  return { armotization, fetchArmotization };
};

export default useLoanArmotization;
