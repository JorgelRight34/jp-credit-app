import {
  ProfileFormValues,
  profileFormFields,
  schema,
  profileFormDefaultValues,
} from "../lib/constants";
import useNewProfile from "../hooks/useNewProfile";
import useEditProfile from "../hooks/useEditProfile";
import useDeleteProfile from "../hooks/useDeleteProfile";
import { Role } from "../../../models/role";
import EntityFormLayout from "../../../common/EntityFormLayout";
import { User } from "../../../models/user";

interface ProfileFormProps {
  role: Role;
  edit?: User;
  defaultValues?: ProfileFormValues;
}

const ProfileForm = ({
  role,
  defaultValues = profileFormDefaultValues,
  edit,
}: ProfileFormProps) => {
  const [onSubmit] = useNewProfile(role);
  const [onEdit] = useEditProfile(role);
  const [deleteProfile] = useDeleteProfile(role);

  const handleOnSubmit = async (data: ProfileFormValues) => {
    if (edit) {
      await onEdit(data, edit.id);
    } else {
      await onSubmit(data);
    }
  };

  return (
    <EntityFormLayout<User>
      onSubmit={handleOnSubmit}
      columns={3}
      rows={4}
      allowDelete={edit ? true : false}
      onDelete={edit ? () => deleteProfile(edit.username) : () => {}}
      defaultValues={defaultValues}
      formFields={
        role === "admin"
          ? [
              ...profileFormFields,
              {
                name: "password",
                label: "Password",
                type: "password",
              },
            ]
          : profileFormFields
      }
      resetValues={edit ? true : false}
      schema={schema}
      uploadFileUrl={edit ? `users/${edit.username}/photo` : ""}
    />
  );
};

export default ProfileForm;
