import api from "../../../api"
import { Note } from "../../../models/note";
import { baseUrl } from "../lib/constants";
import { useQueryClient } from "@tanstack/react-query";

const useDeleteNote = () => {
    const queryClient = useQueryClient()

    const deleteNote = async (id: number) => {
        await api.delete(`${baseUrl}/${id}`);

        // Set individual
        queryClient.setQueryData(["notes", id], undefined);

        // Set plural
        queryClient.setQueryData<Note[]>(["notes", ""], (prev) => prev?.filter(el => el.id !== id))
    }

    return [deleteNote]
}

export default useDeleteNote