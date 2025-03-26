import { useState } from "react"
import api from "../api";

const useUploadFile = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleOnFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target?.files?.[0];
        if (uploadedFile) setFile(uploadedFile);
    }

    const uploadFile = async (url: string) => {
        if (!file) return;

        const data = new FormData();
        data.append("file", file);

        await api.post(url, data);
    }

    return { handleOnFileChange, uploadFile }
}

export default useUploadFile;