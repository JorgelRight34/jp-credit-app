import { createSlice } from "@reduxjs/toolkit";
import { LoanOfficer } from "../../models/loanOfficer";

interface LoanOfficersState {
  loanOfficers: LoanOfficer[];
}

const initialState: LoanOfficersState = { loanOfficers: [] };

const loanOfficersSlice = createSlice({
  name: "loanOfficers",
  initialState,
  reducers: {
    setLoanOfficers: (state, action) => {
      state.loanOfficers = action.payload;
    },
  },
});

export const { setLoanOfficers } = loanOfficersSlice.actions;
export default loanOfficersSlice.reducer;
