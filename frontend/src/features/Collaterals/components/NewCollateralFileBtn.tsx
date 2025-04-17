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
    handleOnFileChange(event);
    const response = await uploadFile(
      `/collaterals/${collateralId}/files`,
      [],
      "files"
    );
    queryClient.setQueryData(["collateral", String(collateralId)], response);
  };

  return (
    <label>
      <input type="file" className="d-none" onChange={handleUploadFile} />
      <span className="btn btn-accent">Añadir Archivo</span>
    </label>
  );
};

export default NewCollateralFileBtn;
