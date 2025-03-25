import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/Auth/authSlice";
import clientsReducer from "./features/Clients/clientsSlice";
import collateralsReducer from "./features/Collaterals/collateralsSlice";
import loansReducer from "./features/Loans/loansSlice";
import transactionsReducer from "./features/Transactions/transactionsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientsReducer,
    collaterals: collateralsReducer,
    loans: loansReducer,
    transactions: transactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
