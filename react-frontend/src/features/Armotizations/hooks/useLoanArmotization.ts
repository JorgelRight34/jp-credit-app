import { useState } from "react"
import { ArmotizationPayment } from "../../../models/armotizationPayment"
import api from "../../../api";
import { baseUrl } from "../lib/constants";

const useLoanArmotization = () => {
    const [armotization, setArmotization] = useState<ArmotizationPayment[]>();
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