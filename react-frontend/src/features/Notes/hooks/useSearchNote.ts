import React, { useState } from "react"
import api from "../../../api";
import { baseUrl } from "../lib/constants";
import { useDispatch } from "react-redux";
import { setNotes } from "../notesSlice";

const useSearchNote = () => {
    const [loanId, setLoanId] = useState(0);
    const [noteId, setNoteId] = useState(0);
    const dispatch = useDispatch();

    const searchNote = async () => {
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