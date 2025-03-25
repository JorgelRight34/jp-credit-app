import { createSlice } from "@reduxjs/toolkit";
import { Client } from "../../models/client";
import { LoanOfficer } from "../../models/loanOfficer";
import { Admin } from "../../models/admin";

interface ClientsState {
  loanOfficers: LoanOfficer[];
  clients: Client[];
  admins: Admin[]
}

const initialState: ClientsState = { admins: [], loanOfficers: [], clients: [] };

const clients = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setClients: (state, action) => {
      state.clients = action.payload;
    },
    setLoanOfficers: (state, action) => {
      state.loanOfficers = action.payload;
    },
    addClient: (state, action) => {
      state.clients = [...state.clients, action.payload];
    },
    addLoanOfficer: (state, action) => {
      state.loanOfficers = [...state.loanOfficers, action.payload];
    },
  },
});

export const { addClient, addLoanOfficer, setClients, setLoanOfficers } =
  clients.actions;
export default clients.reducer;
