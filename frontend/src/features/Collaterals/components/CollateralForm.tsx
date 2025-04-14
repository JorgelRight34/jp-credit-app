import {
  CollateralFormValues,
  collateralsFormFields,
  schema,
} from "../lib/constants";
import useNewCollateral from "../hooks/useNewCollateral";
import useEditCollateral from "../hooks/useEditCollateral";
import useDeleteCollateral from "../hooks/useDeleteCollateral";
import { useNavigate } from "react-router";
import EntityFormLayout from "../../../common/EntityFormLayout";
import { Collateral } from "../../../models/collateral";

interface CollateralFormProps {
  edit?: Collateral;
  defaultValues?: CollateralFormValues;
}

const CollateralForm = ({ defaultValues, edit }: CollateralFormProps) => {
  const [onSubmit] = useNewCollateral();
  const [onEdit] = useEditCollateral();
  const [onDelete] = useDeleteCollateral();
  const navigate = useNavigate();

  const handleOnSubmit = async (data: CollateralFormValues) => {
    if (edit) {
      await onEdit(data, edit.id);
      navigate(0);
    } else {
      await onSubmit(data);
    }
  };

  const handleOnDelete = async () => {
    if (!edit) return;
    await onDelete(edit.id);
    navigate("/collaterals");
  };

  return (
    <EntityFormLayout<Collateral>
      columns={3}
      rows={3}
      formFields={collateralsFormFields}
      schema={schema}
      edit={edit}
      defaultValues={defaultValues}
      onSubmit={handleOnSubmit}
      onDelete={handleOnDelete}
      allowDelete={edit ? true : false}
      uploadFileUrl={edit ? `collaterals/${edit.id}/photo` : ""}
      resetValues={edit ? true : false}
    />
  );
};

export default CollateralForm;
