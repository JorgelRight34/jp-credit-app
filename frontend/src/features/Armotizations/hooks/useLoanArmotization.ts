import { Dispatch, SetStateAction, useState } from "react"
import { ArmotizationPayment } from "../../../models/armotizationPayment"
import api from "../../../api";
import { baseUrl } from "../lib/constants";

interface UseLoanArmotizationReturn {
    armotization: ArmotizationPayment[];
    setArmotizationId: Dispatch<SetStateAction<number | undefined>>;
    fetchArmotization: () => void;
    handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
* const { armotization, fetchArmotization, handleOnChange } = useLoanArmotization();
*/

const useLoanArmotization = (): UseLoanArmotizationReturn => {
    const [armotization, setArmotization] = useState<ArmotizationPayment[]>([]);
    const [armotizationId, setArmotizationId] = useState<number | undefined>();

    const fetchArmotization = async () => {
        if (!armotizationId) return;
        const response = await api.get(`${baseUrl}/loans/${armotizationId}`);
        setArmotization(response.data);
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        if (isNaN(value)) return;

        setArmotizationId(value);
    }

    return { armotization, setArmotizationId, fetchArmotization, handleOnChange }
}

export default useLoanArmotization;