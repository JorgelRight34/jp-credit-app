import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import api from "../../../api";
import { setNotes } from "../notesSlice";
import { useEffect } from "react";
import { baseUrl } from "../lib/constants";
import { Note } from "../../../models/note";

const useNotes = (
  query: string = ""
): [Note[], (page: number) => Promise<void>] => {
  const { notes } = useSelector((state: RootState) => state.notes);
  const dispatch = useDispatch();

  const fetchNotes = async (page: number = 1) => {
    const response = await api.get(baseUrl + `?page=${page}&${query}`);
    dispatch(setNotes(response.data || []));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return [notes, fetchNotes];
};

export default useNotes;
