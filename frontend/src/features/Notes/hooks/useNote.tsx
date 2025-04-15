import { useState } from "react";
import api from "../../../api";
import { Note } from "../../../models/note";
import { baseUrl } from "../lib/constants";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useQuery } from "@tanstack/react-query";

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
type UseNoteReturn = {
  note: Note | null;
  error: boolean;
  fetchNote: (id: string) => Promise<Note>;
};

const useNote = (id: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNote(id),
  });

  const fetchNote = async (id: string) => {
    const response = await api.get(`${baseUrl}/${id}`);
    return response.data;
  };

  return { note: data, isError, isLoading };
};

export default useNote;
