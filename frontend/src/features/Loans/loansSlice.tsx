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
    updateLoan: (state, action) => {
      state.loans = [
        ...state.loans.map((loan) => {
          if (loan.id === action.payload.id) return action.payload;
          return loan;
        }),
      ];
    },
    removeLoan: (state, action) => {
      state.loans = [
        ...state.loans.filter((loan) => loan.id !== action.payload.id),
      ];
    },
  },
});

export const { addLoan, removeLoan, updateLoan, setLoans } = loans.actions;
export default loans.reducer;
