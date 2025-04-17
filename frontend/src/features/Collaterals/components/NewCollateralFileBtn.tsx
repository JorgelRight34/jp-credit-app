import { useState } from "react";
import useUploadFile from "../../../hooks/useUploadFile";
import { useQueryClient } from "@tanstack/react-query";
import MultipleFilesInput from "../../../common/ui/MultipleFilesInput";

interface NewCollateralFileBtnProps {
  collateralId: number;
}

const NewCollateralFileBtn = ({ collateralId }: NewCollateralFileBtnProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const { uploadFile } = useUploadFile();
  const queryClient = useQueryClient();

  const handleOnConfirm = async () => {
    const response = await uploadFile(
      `/collaterals/${collateralId}/files`,
      files,
      "files"
    );
    queryClient.setQueryData(["collateral", String(collateralId)], response);
  };
  return (
    <MultipleFilesInput
      className=""
      onConfirm={handleOnConfirm}
      files={files}
      setFiles={setFiles}
      maxLength={10}
    />
  );
};

export default NewCollateralFileBtn;
