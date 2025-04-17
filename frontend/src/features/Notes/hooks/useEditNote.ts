import { useDispatch } from "react-redux";
import api from "../../../api";
import { baseUrl, NoteFormValues } from "../lib/constants";
import { updateNote } from "../notesSlice";

const useEditNote = () => {
  const dispatch = useDispatch();

  const editNote = async (data: NoteFormValues, id: number) => {
    const response = await api.put(`${baseUrl}/${id}`, data);
    dispatch(updateNote(response.data));
    return response.data;
  };

  return [editNote];
};

export default useEditNote;
