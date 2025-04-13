import { useEffect, useState } from "react";
import api from "../../../api";
import { Note } from "../../../models/note";
import { baseUrl } from "../lib/constants";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const useNote = (id?: string) => {
  const [note, setNote] = useState<Note | null>(null);
  const [error, setError] = useState(false);
  const { notes } = useSelector((state: RootState) => state.notes);

  const fetchNote = () => {
    if (!id || Number(id)) return;

    // Try to find item in memory
    const found = notes.find((note) => note.id === Number(id));
    if (found) {
      setNote(found);
      return;
    }

    // If item not in memory then fetch it
    api
      .get(`${baseUrl}/${id}`)
      .then((res) => setNote(res.data))
      .catch(() => setError(true));
  };

  useEffect(() => {
    fetchNote();
  }, []);

  return [note, error];
};

export default useNote;
