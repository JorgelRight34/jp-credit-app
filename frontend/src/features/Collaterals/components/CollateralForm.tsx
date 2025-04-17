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
import useUploadFile from "../../../hooks/useUploadFile";
import EntityForm from "../../../common/EntityForm/EntityForm";
import { toast } from "react-toastify";

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
    edit
      ? edit.photos.length > 0
        ? edit.photos.map((photo) => photo.url)
        : []
      : []
  );
  const navigate = useNavigate();
  const { uploadFile, deleteFile } = useUploadFile();

  const handleOnSubmit = async (data: CollateralFormValues) => {
    let response = await (edit ? onEdit(data, edit.id) : onSubmit(data));

    if (files.length > 0 && response) {
      response = await uploadFile(
        `collaterals/${response.id}/photo`,
        files,
        "files"
      );
    }

    const photos = edit?.photos;
    const responseId = response?.id;
    if (
      photos &&
      photos.length > 0 &&
      defaultFileSources.length < photos.length &&
      response
    ) {
      photos
        .filter((el) => !defaultFileSources.includes(el.url))
        .forEach(async (p) => {
          response = await deleteFile(
            `collaterals/${responseId}/photo/${p.publicId}`
          );
        });
    }

    if (response) {
      toast.success("La garantía ha sido guardada exitosamente.");
    }
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
      onDelete={handleOnDelete}
      filesMaxLength={10}
      allowDelete={edit ? true : false}
      resetValues={edit ? false : true}
    />
  );
};

export default CollateralForm;
