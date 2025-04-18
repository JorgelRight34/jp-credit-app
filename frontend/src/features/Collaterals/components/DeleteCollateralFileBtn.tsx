import { toast } from "react-toastify";
import AccentBtn from "../../../common/ui/AccentBtn";
import useUploadFile from "../../../hooks/useUploadFile";
import { ApiFile } from "../../../models/apiFile";
import { useQueryClient } from "@tanstack/react-query";
import { Collateral } from "../../../models/collateral";

interface DeleteCollateralFileBtnProps {
  collateral: Collateral;
  file: ApiFile;
}

const DeleteCollateralFileBtn = ({
  collateral,
  file,
}: DeleteCollateralFileBtnProps) => {
  const { deleteFile } = useUploadFile();
  const queryClient = useQueryClient();

  const handleOnClick = async () => {
    await deleteFile(`/collaterals/${collateral.id}/files/${file.publicId}`);

    toast.success("El archivo ha sido eliminado");
    queryClient.setQueryData(["collaterals", collateral.id], {
      ...collateral,
      files: collateral.files.filter((f) => f.publicId !== file.publicId),
    });
  };

  return <AccentBtn onClick={handleOnClick}>Borrar</AccentBtn>;
};

export default DeleteCollateralFileBtn;
