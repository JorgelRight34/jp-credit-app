import api from "../../../api"
import { baseUrl, NoteFormValues } from "../lib/constants"
import { useQueryClient } from "@tanstack/react-query";
import { Note } from "../../../models/note";

const useNewNote = () => {
    const queryClient = useQueryClient();

    const postNewNote = async (data: NoteFormValues) => {
        const response = await api.post(baseUrl, data);
        const note = response.data;

        // Set singular
        queryClient.setQueryData(["notes", note.id], note);

        // Set plurarl
        queryClient.setQueryData<Note[]>(["notes", ""], (prev) => [...(prev || []), note]);

        return note;
    }

    return [postNewNote]
}

export default useNewNote;