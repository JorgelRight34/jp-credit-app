import { useForm } from "react-hook-form";
import EntityFormLayout from "../../../common/EntityFormLayout";
import { renderFormInputs } from "../../../utils/formUtils";
import { noteFormFields, NoteFormValues } from "../lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../lib/constants";
import useNewNote from "../hooks/useNewNote";
import FormInput from "../../../common/FormInput";
import useEditNote from "../hooks/useEditNote";
import useDeleteNote from "../hooks/useDeleteNote";

interface NoteFormProps {
  defaultValues?: NoteFormValues;
  edit?: number;
}

const NoteForm = ({ edit, defaultValues }: NoteFormProps) => {
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const [onCreate] = useNewNote();
  const [onEdit] = useEditNote();
  const [onDelete] = useDeleteNote();

  const handleOnSubmit = async (data: NoteFormValues) => {
    if (edit) {
      await onEdit(data, edit);
      window.location.reload();
    } else {
      await onCreate(data);
    }
    reset();
  };

  return (
    <>
      <EntityFormLayout
        onSubmit={handleSubmit(handleOnSubmit)}
        allowDelete={edit ? true : false}
        onDelete={() => (edit ? onDelete(edit) : () => {})}
      >
        <div className="col-lg-6">
          {renderFormInputs(noteFormFields, 0, 1, register, errors)}
        </div>
        <div className="col-lg-6">
          {renderFormInputs(noteFormFields, 2, 4, register, errors)}
          <div className="mb-3">
            <FormInput
              label="Loan Id"
              type="number"
              error={errors.loanId?.message}
              {...register("loanId")}
            />
          </div>
        </div>
        <div className="row">
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              required={true}
              {...register("description")}
            />
          </div>
        </div>
      </EntityFormLayout>
    </>
  );
};

export default NoteForm;
