import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./components/Auth/authSlice";
import clientsReducer from "./components/Clients/clientsSlice";
import loanOfficersReducer from "./components/LoanOfficers/loanOfficersSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientsReducer,
    loanOfficers: loanOfficersReducer,
  },
});

export default store;
