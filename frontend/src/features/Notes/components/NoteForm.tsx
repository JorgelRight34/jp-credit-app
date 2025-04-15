import { noteFormFields, NoteFormValues, schema } from "../lib/constants";
import useNewNote from "../hooks/useNewNote";
import useEditNote from "../hooks/useEditNote";
import useDeleteNote from "../hooks/useDeleteNote";
import { Note } from "../../../models/note";
import EntityForm from "../../../common/EntityForm/EntityForm";

interface NoteFormProps {
  defaultValues?: NoteFormValues;
  edit?: Note;
}

const NoteForm = ({ edit, defaultValues }: NoteFormProps) => {
  const [onCreate] = useNewNote();
  const [onEdit] = useEditNote();
  const [onDelete] = useDeleteNote();

  const onSubmit = async (data: NoteFormValues) => {
    if (edit) {
      await onEdit(data, edit.id);
      window.location.reload();
    } else {
      await onCreate(data);
    }
  };

  return (
    <>
      <EntityForm<Note, NoteFormValues>
        onSubmit={onSubmit}
        formFields={noteFormFields}
        schema={schema}
        columns={3}
        rows={1}
        defaultValues={defaultValues}
        edit={edit}
        allowDelete={edit ? true : false}
        onDelete={() => (edit ? onDelete(edit.id) : () => {})}
        resetValues={edit ? true : false}
      />
    </>
  );
};

export default NoteForm;
