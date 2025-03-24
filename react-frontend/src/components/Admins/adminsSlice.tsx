import { createSlice } from "@reduxjs/toolkit";
import { Admin } from "../../models/admin";

interface AdminsState {
  admins: Admin[];
}

const initialState: AdminsState = { admins: [] };

const admins = createSlice({
  name: "admins",
  initialState,
  reducers: {
    setAdmins: (state, action) => {
      state.admins = action.payload;
    },
  },
});

export const { setAdmins } = admins.actions;
export default admins.reducer;
