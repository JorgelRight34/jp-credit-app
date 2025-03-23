import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/user";

interface AuthState {
  user: User | undefined;
}

const initialState: AuthState = { user: undefined };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = undefined;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
