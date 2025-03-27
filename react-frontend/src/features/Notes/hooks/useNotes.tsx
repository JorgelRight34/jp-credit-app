import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import api from "../../../api";
import { setNotes } from "../notesSlice";
import { useEffect } from "react";
import { baseUrl } from "../lib/constants";

const useNotes = () => {
  const { notes } = useSelector((state: RootState) => state.notes);
  const dispatch = useDispatch();

  const fetchNotes = async () => {
    const response = await api.get(baseUrl);
    dispatch(setNotes(response.data || []));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return [notes];
};

export default useNotes;
