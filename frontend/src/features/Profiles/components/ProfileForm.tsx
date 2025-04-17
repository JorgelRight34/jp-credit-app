import { ProfileFormValues, profileFormFields, schema } from "../lib/constants";
import useNewProfile from "../hooks/useNewProfile";
import useEditProfile from "../hooks/useEditProfile";
import useDeleteProfile from "../hooks/useDeleteProfile";
import { Role } from "../../../models/role";
import { User } from "../../../models/user";
import { useState } from "react";
import useUploadFile from "../../../hooks/useUploadFile";
import EntityForm from "../../../common/EntityForm/EntityForm";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface ProfileFormProps {
  role: Role;
  edit?: User;
  defaultValues?: ProfileFormValues;
}

const ProfileForm = ({ role, defaultValues, edit }: ProfileFormProps) => {
  const [onSubmit] = useNewProfile(role);
  const [onEdit] = useEditProfile(role);
  const [deleteProfile] = useDeleteProfile(role);
  const [files, setFiles] = useState<File[]>([]);
  const [defaultFileSources, setDefaultFileSources] = useState(
    edit ? (edit.photo?.url ? [edit.photo.url] : []) : []
  );
  const { uploadFile, deleteFile } = useUploadFile();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleOnSubmit = async (data: ProfileFormValues) => {
    let response = edit
      ? await onEdit(data, edit.username)
      : await onSubmit(data);

    if (files.length) {
      response = await uploadFile(`users/${response.username}/photo`, files);
      if (!edit) setFiles([]);
    }

    if (edit?.photo?.url && defaultFileSources.length === 0) {
      response = await deleteFile(
        `users/${response.username}/photo/${edit.photo.publicId}`
      );
    }

    if (response) {
      queryClient.setQueryData(["profile", response.id], response);
      toast.success("Cliente agregado exitosamente.");
    }
  };

  const handleOnDelete = async () => {
    if (edit) {
      await deleteProfile(edit.username);
      navigate(`/profiles/${edit.roles?.[0] || ""}`);
    }
  };

  return (
    <EntityForm<User, ProfileFormValues>
      onSubmit={handleOnSubmit}
      filesMaxLength={1}
      files={files}
      setFiles={setFiles}
      columns={4}
      rows={4}
      allowDelete={edit ? true : false}
      onDelete={handleOnDelete}
      defaultValues={defaultValues}
      defaultFileSources={defaultFileSources}
      setDefaultFileSources={setDefaultFileSources}
      formFields={
        role === "admin"
          ? [
              ...profileFormFields,
              {
                name: "password",
                label: "Password",
                type: "password",
                required: true,
              },
            ]
          : profileFormFields
      }
      resetValues={edit ? false : true}
      schema={schema}
    />
  );
};

export default ProfileForm;
