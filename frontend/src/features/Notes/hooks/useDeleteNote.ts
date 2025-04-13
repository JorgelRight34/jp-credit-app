import { useDispatch } from "react-redux";
import api from "../../../api"
import { removeNote } from "../notesSlice";
import { baseUrl } from "../lib/constants";

const useDeleteNote = () => {
    const dispatch = useDispatch();

    const deleteNote = async (id: number) => {
        await api.delete(`${baseUrl}/${id}`);
        dispatch(removeNote({ id: id }))
    }

    return [deleteNote]
}

export default useDeleteNote