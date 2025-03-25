import { createSlice } from "@reduxjs/toolkit";
import { Transaction } from "../../models/transaction";

interface TransactionsInitialState {
    transactions: Transaction[]
}

const initialState: TransactionsInitialState = { transactions: [] }

const transactions = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        setTransactions: (state, action) => { state.transactions = action.payload },
        addTransaction: (state, action) => { state.transactions = [...state.transactions, action.payload] }
    }
})

export const { addTransaction, setTransactions } = transactions.actions;
export default transactions.reducer;