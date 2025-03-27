import { useEffect, useState } from "react";
import api from "../../../api";
import { Note } from "../../../models/note";
import { baseUrl } from "../lib/constants";

const useNote = (id?: string) => {
  const [note, setNote] = useState<Note | null>(null);
  const [error, setError] = useState(false);

  const fetchNote = () => {
    if (!id) return;

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
