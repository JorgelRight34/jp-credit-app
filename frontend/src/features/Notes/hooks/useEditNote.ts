import { useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import { baseUrl, NoteFormValues } from "../lib/constants";
import { Note } from "../../../models/note";

const useEditNote = () => {
  const queryClient = useQueryClient();

  const editNote = async (data: NoteFormValues, id: number) => {
    const response = await api.put(`${baseUrl}/${id}`, data);
    const note = response.data;

    // Set singular
    queryClient.setQueryData(["notes", id], note);

    // Set plurarl
    queryClient.setQueryData<Note[]>(["notes", ""], (prev) => [...(prev || []), note]);

    return response.data;
  };

  return [editNote];
};

export default useEditNote;
