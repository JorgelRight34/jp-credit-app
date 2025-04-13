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
    removeLoan: (state, action) => {
      state.loans = [
        ...state.loans.filter((loan) => loan.id !== action.payload.id),
      ];
    },
  },
});

export const { addLoan, removeLoan, setLoans } = loans.actions;
export default loans.reducer;
