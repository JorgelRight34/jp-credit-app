import { createSlice } from "@reduxjs/toolkit";
import { Collateral } from "../../models/collateral";

interface CollateralsState {
  collaterals: Collateral[];
}

const initialState: CollateralsState = { collaterals: [] };

const collaterals = createSlice({
  name: "collaterals",
  initialState,
  reducers: {
    setCollaterals: (state, action) => {
      state.collaterals = action.payload;
    },
    addCollateral: (state, action) => {
      state.collaterals = [...state.collaterals, action.payload];
    },
  },
});

export const { addCollateral, setCollaterals } = collaterals.actions;
export default collaterals.reducer;
