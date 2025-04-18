import { toast } from "react-toastify";
import useUploadFile from "../../../hooks/useUploadFile";
import { useQueryClient } from "@tanstack/react-query";

interface NewCollateralFileBtnProps {
  collateralId: number;
}

const NewCollateralFileBtn = ({ collateralId }: NewCollateralFileBtnProps) => {
  const { uploadFile, handleOnFileChange } = useUploadFile();
  const queryClient = useQueryClient();

  const handleUploadFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = await handleOnFileChange(event);
    if (!file) toast.error("El archivo no pudo cargarse. Intente de nuevo.");

    if (!file) return;

    const response = await uploadFile(
      `/collaterals/${collateralId}/files`,
      [file],
      "files"
    );

    console.log(`updating at key ${["collaterals", collateralId]}`);
    queryClient.setQueryData(["collaterals", collateralId], response);
    toast.success("Archivo subido correctamentes!");
  };

  return (
    <label>
      <input type="file" className="d-none" onChange={handleUploadFile} />
      <span className="btn btn-accent">Añadir Archivo</span>
    </label>
  );
};

export default NewCollateralFileBtn;
