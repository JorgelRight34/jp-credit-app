import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { clientFormFields, schema } from "../lib/constants";
import useNewClient from "../hooks/useNewClient";
import { Role } from "../../../models/role";
import { renderFormInputs } from "../../../utils/formUtils";

interface ClientFormProps {
  role: Role;
}

const ClientForm = ({ role }: ClientFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [onSubmit] = useNewClient([role]);

  const renderFormInputsSlice = (start: number, end: number) =>
    renderFormInputs(clientFormFields, start, end, register, errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        </div>
      </div>
      <button type="submit" className="btn btn-accent w-100">
        Submit
      </button>
    </form>
  );
};

export default ClientForm;
