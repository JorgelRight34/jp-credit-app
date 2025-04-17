import { toast } from "react-toastify";
import AccentBtn from "../../../common/ui/AccentBtn";
import useUploadFile from "../../../hooks/useUploadFile";
import { CollateralFile } from "../../../models/collateralFile";
import { useQueryClient } from "@tanstack/react-query";
import { Collateral } from "../../../models/collateral";

interface DeleteCollateralFileBtnProps {
  collateral: Collateral;
  file: CollateralFile;
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
    queryClient.setQueryData(["collateral", String(collateral.id)], {
      ...collateral,
      files: collateral.files.filter((f) => f.publicId !== file.publicId),
    });
  };

  return <AccentBtn onClick={handleOnClick}>Borrar</AccentBtn>;
};

export default DeleteCollateralFileBtn;
