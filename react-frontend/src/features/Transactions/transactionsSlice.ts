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
        addTransaction: (state, action) => { state.transactions = [...state.transactions, action.payload] },
        removeTransaction: (state, action) => { state.transactions = state.transactions.filter(t => t.id !== action.payload.id) }
    }
})

export const { addTransaction, setTransactions, removeTransaction } = transactions.actions;
export default transactions.reducer;