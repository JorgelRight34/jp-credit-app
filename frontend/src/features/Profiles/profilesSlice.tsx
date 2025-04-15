import { createSlice } from "@reduxjs/toolkit";
import { Client } from "../../models/client";
import { LoanOfficer } from "../../models/loanOfficer";
import { Admin } from "../../models/admin";
import { Guarantor } from "../../models/guarantor";
import { User } from "../../models/user";

interface ProfilesState {
  loanOfficers: LoanOfficer[];
  clients: Client[];
  admins: Admin[];
  guarantors: Guarantor[];
  users: User[];
}

const initialState: ProfilesState = {
  users: [],
  admins: [],
  loanOfficers: [],
  clients: [],
  guarantors: [],
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
    setGuarantors: (state, action) => {
      state.admins = action.payload;
    },
    setProfiles: (state, action) => {
      state.users = action.payload;
    },
    addClient: (state, action) => {
      state.clients = [...state.clients, action.payload];
    },
    addAdmin: (state, action) => {
      state.admins = [...state.admins, action.payload];
    },
    addGuarantor: (state, action) => {
      state.guarantors = [action.payload, ...state.guarantors];
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
    updateGuarantor: (state, action) => {
      state.guarantors = [
        action.payload,
        ...state.guarantors.filter(
          (guarantor) => guarantor.id !== action.payload.id
        ),
      ];
    },
    removeClient: (state, action) => {
      state.clients = state.clients.filter(
        (client) => client.id !== action.payload.id
      );
    },
    removeAdmin: (state, action) => {
      state.admins = state.admins.filter(
        (admin) => admin.id !== action.payload.id
      );
    },
    removeLoanOfficer: (state, action) => {
      state.loanOfficers = state.loanOfficers.filter(
        (officer) => officer.id !== action.payload.id
      );
    },
    removeGuarantor: (state, action) => {
      state.guarantors = state.guarantors.filter(
        (guarantor) => guarantor.id !== action.payload.id
      );
    },
  },
});

export const {
  addClient,
  addAdmin,
  addGuarantor,
  addLoanOfficer,
  setClients,
  setAdmins,
  setLoanOfficers,
  setProfiles,
  setGuarantors,
  updateClient,
  updateAdmin,
  updateLoanOfficer,
  updateGuarantor,
  removeClient,
  removeLoanOfficer,
  removeAdmin,
  removeGuarantor,
} = profiles.actions;
export default profiles.reducer;
