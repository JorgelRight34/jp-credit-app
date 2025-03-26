import { useState } from "react"
import api from "../../../api";
import { ArmotizationPayment } from "../../../models/armotizationPayment";

const useGenerateArmotization = () => {
    const [form, setForm] = useState({
        principalBalance: 0,
        annualInterestRate: 0,
        paymentFrequency: 12,
        numberOfPayments: 12
    })
    const [armotization, setArmotization] = useState<ArmotizationPayment[]>()

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = event.target.name;
        const value = Number(event.target.value);
        if (isNaN(value)) return;

        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const query: string = Object.keys(form).map(key => `${key}=${form[key as keyof typeof form]}`).join('&');
        const response = await api.get(`armotizations/?${query}`);
        setArmotization(response.data);
    }

    return { handleOnChange, handleOnSubmit, armotization }
}

export default useGenerateArmotization;