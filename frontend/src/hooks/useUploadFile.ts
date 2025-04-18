import { useState } from "react";
import api from "../api";

const useUploadFile = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleOnFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target?.files?.[0];
    if (uploadedFile) setFile(uploadedFile);
    return uploadedFile || undefined;
  };

  const uploadFile = async (url: string, files: File[] = [], key = "file") => {
    if (files.length === 0) return;
    if (file) files.push(file);

    const data = new FormData();
    files.forEach((f) => data.append(key, f));

    const response = await api.post(url, data);
    return response.data;
  };

  const deleteFile = async (url: string) => {
    await api.delete(url);
  };

  return { handleOnFileChange, uploadFile, deleteFile };
};

export default useUploadFile;
