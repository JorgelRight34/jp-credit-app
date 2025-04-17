import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/Auth/authSlice";
import collateralsReducer from "./features/Collaterals/collateralsSlice";
import loansReducer from "./features/Loans/loansSlice";
import transactionsReducer from "./features/Transactions/transactionsSlice";
import notesReducer from "./features/Notes/notesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    collaterals: collateralsReducer,
    loans: loansReducer,
    transactions: transactionsReducer,
    notes: notesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
