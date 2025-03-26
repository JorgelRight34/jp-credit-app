import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { renderFormInputs } from "../../../utils/formUtils";
import FormInput from "../../../common/FormInput";

interface ProfileFormProps {
  role: Role;
  edit?: string;
  defaultValues?: ProfileFormValues;
}

const ProfileForm = ({
  role,
  defaultValues = profileFormDefaultValues,
  edit = "",
}: ProfileFormProps) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });
  const [onSubmit] = useNewProfile(role);
  const [onEdit] = useEditProfile(edit, role);
  const [deleteprofile] = useDeleteProfile(role, edit);

  const renderFormInputsSlice = (start: number, end: number) =>
    renderFormInputs(profileFormFields, start, end, register, errors);

  const handleOnSubmit = async (data: ProfileFormValues) => {
    if (edit) {
      await onEdit(data);
    } else {
      await onSubmit(data);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="row mx-0 pt-3">
        <div className="col-lg-4">{renderFormInputsSlice(0, 4)}</div>
        <div className="col-lg-4">{renderFormInputsSlice(4, 8)}</div>
        <div className="col-lg-4">
          {renderFormInputsSlice(8, 12)}
          <div className="mb-3">
            <label className="form-label" htmlFor="gender">
              Gender
            </label>
            <select className="form-select" id="gender" {...register("gender")}>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="maritalStatus">
              Marital Status
            </label>
            <select
              className="form-select"
              id="maritalStatus"
              {...register("maritalStatus")}
            >
              <option value="single">Soltero</option>
              <option value="married">Casado</option>
              <option value="divorced">Divorciado</option>
              <option value="widow">Viudo</option>
            </select>
          </div>
          {role === "admin" && (
            <FormInput
              label="Password"
              required={true}
              {...register("password")}
              type="password"
            />
          )}
        </div>
      </div>
      <button type="submit" className="btn btn-accent w-100">
        Submit
      </button>
      {edit && (
        <button
          type="button"
          className="btn btn-danger w-100"
          onClick={deleteprofile}
        >
          Delete
        </button>
      )}
    </form>
  );
};

export default ProfileForm;
