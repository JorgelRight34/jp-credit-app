import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/Auth/authSlice";
import transactionsReducer from "./features/Transactions/transactionsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
