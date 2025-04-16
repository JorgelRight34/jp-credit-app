import { noteFormFields, NoteFormValues, schema } from "../lib/constants";
import useNewNote from "../hooks/useNewNote";
import useEditNote from "../hooks/useEditNote";
import useDeleteNote from "../hooks/useDeleteNote";
import { Note } from "../../../models/note";
import EntityForm from "../../../common/EntityForm/EntityForm";
import { useQueryClient } from "@tanstack/react-query";

interface NoteFormProps {
  defaultValues?: NoteFormValues;
  edit?: Note;
}

const NoteForm = ({ edit, defaultValues }: NoteFormProps) => {
  const [onCreate] = useNewNote();
  const [onEdit] = useEditNote();
  const [onDelete] = useDeleteNote();
  const queryClient = useQueryClient();

  const onSubmit = async (data: NoteFormValues) => {
    const response = await (edit ? onEdit(data, edit.id) : onCreate(data));
    if (response) {
      queryClient.setQueryData(["note", response.id], response);
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
