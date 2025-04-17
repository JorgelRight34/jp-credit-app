import useUploadFile from "../../../hooks/useUploadFile";
import { Collateral } from "../../../models/collateral";
import { Photo } from "../../../models/photo";

const useUploadCollateralFiles = () => {
    const { uploadFile, deleteFile } = useUploadFile();

    const uploadFiles = async (collateral: Collateral, files: File[]) => {
        if (files.length > 0) {
            const response = await uploadFile(
                `collaterals/${collateral.id}/photo`,
                files,
                "files"
            );
            return response.data;
        }
    }

    const deletePhotos = async (collateral: Collateral, photos: Photo[]) => {
        photos.forEach(async (p) => {
            await deleteFile(
                `collaterals/${collateral.id}/photo/${p.publicId}`
            );
        });
    }

    return { uploadFiles, deletePhotos }
}

export default useUploadCollateralFiles;