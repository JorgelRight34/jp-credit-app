import { useCallback } from "react";
import api from "../../../api";
import { baseUrl } from "../lib/constants";

const useDownloadArmotization = () => {
    const downloadCustomArmotization = useCallback(async (body: string) => {
        console.log("using");
        const response = await api.get(`${baseUrl}/csv/?${body}`, { responseType: 'blob' });
        downloadFile(response.data);
    }, []);

    const downloadLoanArmotization = useCallback(async (id: number) => {
        const response = await api.get(`${baseUrl}/loans/${id}/csv`, { responseType: 'blob' });
        downloadFile(response.data);
    }, []);

    const downloadFile = (file: Blob) => {
        const a = document.createElement('a');
        const fileUrl = URL.createObjectURL(file);
        a.href = fileUrl;
        a.download = "armotization.csv"
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(fileUrl);
    }

    return [downloadCustomArmotization, downloadLoanArmotization]
}

export default useDownloadArmotization;