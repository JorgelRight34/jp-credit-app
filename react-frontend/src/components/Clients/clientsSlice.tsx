import { createSlice } from "@reduxjs/toolkit";
import { Client } from "../../models/client";

interface ClientsState {
  clients: Client[];
}

const initialState: ClientsState = { clients: [] };

const clients = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setClients: (state, action) => {
      state.clients = action.payload;
    },
  },
});

export const { setClients } = clients.actions;
export default clients.reducer;
