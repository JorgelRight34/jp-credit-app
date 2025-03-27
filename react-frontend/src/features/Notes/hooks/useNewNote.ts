import { useDispatch } from "react-redux";
import api from "../../../api"
import { baseUrl, NoteFormValues } from "../lib/constants"
import { addNote } from "../notesSlice";

const useNewNote = () => {
    const dispatch = useDispatch();

    const postNewNote = async (data: NoteFormValues) => {
        const response = await api.post(baseUrl, data);
        dispatch(addNote(response.data));
    }

    return [postNewNote]
}

export default useNewNote;