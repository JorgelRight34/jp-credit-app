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

interface CollateralFormProps {
  edit?: Collateral;
  defaultValues?: CollateralFormValues;
}

const CollateralForm = ({ defaultValues, edit }: CollateralFormProps) => {
  const [onSubmit] = useNewCollateral();
  const [onEdit] = useEditCollateral();
  const [onDelete] = useDeleteCollateral();
  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();
  const { uploadFile } = useUploadFile();

  const handleOnSubmit = async (data: CollateralFormValues) => {
    let response;
    if (edit) {
      response = await onEdit(data, edit.id);
      navigate(0);
    } else {
      response = await onSubmit(data);
    }

    if (files.length > 0 && response?.id) {
      await uploadFile(`collaterals/${response.id}/photo`, files);
    }
  };

  const handleOnDelete = async () => {
    if (!edit) return;
    await onDelete(edit.id);
    navigate("/collaterals");
  };

  return (
    <EntityForm<Collateral, CollateralFormValues>
      columns={3}
      rows={3}
      formFields={collateralsFormFields}
      schema={schema}
      edit={edit}
      defaultValues={defaultValues}
      setFiles={setFiles}
      files={files}
      onSubmit={handleOnSubmit}
      onDelete={handleOnDelete}
      filesMaxLength={10}
      allowDelete={edit ? true : false}
      resetValues={edit ? true : false}
    />
  );
};

export default CollateralForm;
