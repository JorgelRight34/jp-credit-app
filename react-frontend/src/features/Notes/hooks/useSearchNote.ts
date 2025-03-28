import React, { useState } from "react"
import api from "../../../api";
import { baseUrl } from "../lib/constants";
import { useDispatch, useSelector } from "react-redux";
import { setNotes } from "../notesSlice";
import { RootState } from "../../../store";

const useSearchNote = () => {
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

    return [searchNote, handleOnLoanIdChange, handleOnNoteIdChange]
}

export default useSearchNote