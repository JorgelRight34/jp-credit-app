import { createSlice } from "@reduxjs/toolkit";
import { Client } from "../../models/client";
import { LoanOfficer } from "../../models/loanOfficer";
import { Admin } from "../../models/admin";

interface ProfilesState {
  loanOfficers: LoanOfficer[];
  clients: Client[];
  admins: Admin[];
}

const initialState: ProfilesState = {
  admins: [],
  loanOfficers: [],
  clients: [],
};

const profiles = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    setClients: (state, action) => {
      state.clients = action.payload;
    },
    setLoanOfficers: (state, action) => {
      state.loanOfficers = action.payload;
    },
    setAdmins: (state, action) => {
      state.admins = action.payload;
    },
    addClient: (state, action) => {
      state.clients = [...state.clients, action.payload];
    },
    addAdmin: (state, action) => {
      state.admins = [...state.admins, action.payload];
    },
    addLoanOfficer: (state, action) => {
      state.loanOfficers = [...state.loanOfficers, action.payload];
    },
    updateClient: (state, action) => {
      state.clients = [
        action.payload,
        ...state.clients.filter((client) => client.id !== action.payload.id),
      ];
    },
    updateLoanOfficer: (state, action) => {
      state.loanOfficers = [
        action.payload,
        ...state.loanOfficers.filter(
          (officer) => officer.id !== action.payload.id
        ),
      ];
    },
    updateAdmin: (state, action) => {
      state.admins = [
        action.payload,
        ...state.admins.filter((admin) => admin.id !== action.payload.id),
      ];
    },
    removeClient: (state, action) => {
      state.clients = state.clients.filter(
        (client) => client.id !== action.payload.id
      );
    },
  },
});

export const {
  addClient,
  addAdmin,
  addLoanOfficer,
  setClients,
  setAdmins,
  setLoanOfficers,
  updateClient,
  updateAdmin,
  updateLoanOfficer,
  removeClient,
} = profiles.actions;
export default profiles.reducer;
