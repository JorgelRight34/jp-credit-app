import {
  CollateralFormValues,
  collateralsFormFields,
  schema,
} from "../lib/constants";
import useNewCollateral from "../hooks/useNewCollateral";
import useEditCollateral from "../hooks/useEditCollateral";
import useDeleteCollateral from "../hooks/useDeleteCollateral";
import { useNavigate } from "react-router";
import { Collateral } from "../../../models/collateral";
import { useState } from "react";
import EntityForm from "../../../common/EntityForm/EntityForm";
import { toast } from "react-toastify";
import useUploadCollateralFiles from "../hooks/useUploadCollateralFiles";

interface CollateralFormProps {
  edit?: Collateral;
  defaultValues?: CollateralFormValues;
}

const CollateralForm = ({ defaultValues, edit }: CollateralFormProps) => {
  const [onSubmit] = useNewCollateral();
  const [onEdit] = useEditCollateral();
  const [onDelete] = useDeleteCollateral();
  const [files, setFiles] = useState<File[]>([]);
  const [defaultFileSources, setDefaultFileSources] = useState(
    edit?.photos || []
  );
  const navigate = useNavigate();
  const { uploadFiles, deletePhotos } = useUploadCollateralFiles();

  const handleOnSubmit = async (data: CollateralFormValues) => {
    const collateral = await (edit ? onEdit(data, edit.id) : onSubmit(data));

    if (files.length > 0 && collateral) await uploadFiles(collateral, files);

    const photos = edit?.photos;
    if (photos && photos?.length > defaultFileSources.length && collateral) {
      await deletePhotos(
        collateral,
        photos.filter(
          (el) => !defaultFileSources.map((f) => f.url).includes(el.url)
        )
      );
    }

    if (collateral) toast.success("La garantía ha sido guardada exitosamente.");
  };

  const handleOnDelete = async () => {
    if (!edit) return;
    await onDelete(edit.id);
    navigate("/collaterals");
  };

  return (
    <EntityForm<Collateral, CollateralFormValues>
      columns={4}
      rows={3}
      formFields={collateralsFormFields}
      schema={schema}
      edit={edit}
      defaultValues={defaultValues}
      defaultFileSources={defaultFileSources}
      setDefaultFileSources={setDefaultFileSources}
      setFiles={setFiles}
      files={files}
      onSubmit={handleOnSubmit}
      onDelete={edit ? handleOnDelete : undefined}
      filesMaxLength={10}
      resetValues={edit ? false : true}
    />
  );
};

export default CollateralForm;
