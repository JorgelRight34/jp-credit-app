import React, { useState } from "react"
import api from "../../../api";
import { baseUrl } from "../lib/constants";
import { useDispatch, useSelector } from "react-redux";
import { setNotes } from "../notesSlice";
import { RootState } from "../../../store";

interface UseSearchNoteReturn {
    searchNote: () => void;
    handleOnLoanIdChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleOnNoteIdChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Custom hook for searching notes by loan ID and/or note ID
 * @returns {UseSearchNoteReturn} Object containing:
 *   - searchNote: Async function to execute the search
 *   - handleOnLoanIdChange: Handler for loan ID input changes
 *   - handleOnNoteIdChange: Handler for note ID input changes
 *   - loanId: Current loan ID value
 *   - noteId: Current note ID value
 *   - isLoading: Loading state (optional)
 *   - error: Error message if search fails (optional)
 */
const useSearchNote = (): UseSearchNoteReturn => {
    const [loanId, setLoanId] = useState(0);
    const [noteId, setNoteId] = useState(0);
    const { notes } = useSelector((state: RootState) => state.notes);
    const dispatch = useDispatch();

    const searchNote = async () => {
        // Try to find items in memory
        const found = notes.filter(note => note.id === noteId && note.loanId === loanId)
        if (found) {
            dispatch(setNotes(found));
            return;
        }

        // If items not in then fetch it
        const response = await api.get(`${baseUrl}/?${loanId ? `loanId=${loanId}` : ''}&${noteId ? `noteId=${noteId}` : ''}`);
        dispatch(setNotes(response.data));
    }

    const handleOnLoanIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoanId(Number(event.target.value));
    }

    const handleOnNoteIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNoteId(Number(event.target.value));
    }

    return { searchNote, handleOnLoanIdChange, handleOnNoteIdChange }
}

export default useSearchNote