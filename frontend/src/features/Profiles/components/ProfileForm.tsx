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
import { User } from "../../../models/user";
import { useState } from "react";
import useUploadFile from "../../../hooks/useUploadFile";
import EntityForm from "../../../common/EntityForm/EntityForm";

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
  const [files, setFiles] = useState<File[]>([]);
  const { uploadFile } = useUploadFile();

  const handleOnSubmit = async (data: ProfileFormValues) => {
    let response;
    if (edit) {
      response = await onEdit(data, edit.id);
    } else {
      response = await onSubmit(data);
    }
    if (files.length > 0) {
      await uploadFile(`users/${response.data.username}/photo`, files);
    }
  };

  return (
    <EntityForm<User, ProfileFormValues>
      onSubmit={handleOnSubmit}
      filesMaxLength={1}
      files={files}
      setFiles={setFiles}
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
    />
  );
};

export default ProfileForm;
