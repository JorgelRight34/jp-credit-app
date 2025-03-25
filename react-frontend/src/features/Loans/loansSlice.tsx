import { createSlice } from "@reduxjs/toolkit";
import { Loan } from "../../models/loan";

interface LoansState {
  loans: Loan[];
}

const initialState: LoansState = { loans: [] };

const loans = createSlice({
  name: "loans",
  initialState,
  reducers: {
    setLoans: (state, action) => {
      state.loans = action.payload;
    },
    addLoan: (state, action) => {
      state.loans = [...state.loans, action.payload];
    },
  },
});

export const { addLoan, setLoans } = loans.actions;
export default loans.reducer;
