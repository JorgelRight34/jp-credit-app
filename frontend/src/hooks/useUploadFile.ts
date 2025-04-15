import { useState } from "react"
import api from "../api";

const useUploadFile = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleOnFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target?.files?.[0];
        if (uploadedFile) setFile(uploadedFile);
    }

    const uploadFile = async (url: string, files: File[] = []) => {
        if (files.length === 0) return;
        if (file) files.push(file);

        const data = new FormData();
        files.forEach(fil => data.append("file", fil));

        await api.post(url, data);
    }

    return { handleOnFileChange, uploadFile }
}

export default useUploadFile;