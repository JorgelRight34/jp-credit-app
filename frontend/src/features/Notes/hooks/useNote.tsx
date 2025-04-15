import { useEffect, useState } from "react";
import api from "../../../api";
import { Note } from "../../../models/note";
import { baseUrl } from "../lib/constants";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

/**
 * Custom React hook for fetching and managing a single Note
 *
 * @typedef {[Note | null, boolean]} UseNoteReturn - Tuple containing:
 *   - note: The Note object if found, otherwise null
 *   - error: Boolean indicating if an error occurred during fetch
 *
 * @param {string} [id] - Optional ID of the note to fetch
 * @returns {UseNoteReturn} Tuple with note data and error state
 *
 * @example
 * // Basic usage
 * const [note, error] = useNote('123');
 *
 * @example
 * // Conditional fetching
 * const [note, error] = useNote(someId || undefined);
 */
type UseNoteReturn = [note: Note | null, error: boolean];

/**
 * Fetches a single note either from Redux store or API
 * @param {string} [id] - Optional ID of the note to fetch
 * @returns {UseNoteReturn} Tuple containing note and error state
 */

const useNote = (id?: string): UseNoteReturn => {
  const [note, setNote] = useState<Note | null>(null);
  const [error, setError] = useState(false);
  const { notes } = useSelector((state: RootState) => state.notes);

  const fetchNote = () => {
    if (!id || !Number(id)) return;

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
