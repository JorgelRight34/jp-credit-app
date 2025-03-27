import { createSlice } from "@reduxjs/toolkit";
import { Note } from "../../models/note";

interface NotesState {
    notes: Note[]
}

const initialState: NotesState = { notes: [] }

const notes = createSlice({
    name: "notes",
    initialState,
    reducers: {
        setNotes: (state, action) => { state.notes = action.payload },
        addNote: (state, action) => { state.notes = [action.payload, ...state.notes] },
        removeNote: (state, action) => { state.notes = state.notes.filter(note => note.id !== action.payload.id) },
        updateNote: (state, action) => {
            state.notes = state.notes.map(note => {
                if (note.id === action.payload.id) return action.payload;
                return note;
            })
        }
    }
})

export const { setNotes, addNote, removeNote, updateNote } = notes.actions;
export default notes.reducer;