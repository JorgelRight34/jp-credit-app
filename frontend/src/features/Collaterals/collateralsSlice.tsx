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
    updateCollateral: (state, action) => {
      state.collaterals = [
        action.payload,
        ...state.collaterals.filter(
          (collateral) => collateral.id !== action.payload.id
        ),
      ];
    },
    removeCollateral: (state, action) => {
      state.collaterals = state.collaterals.filter(
        (collateral) => collateral.id !== action.payload.id
      );
    },
  },
});

export const {
  addCollateral,
  setCollaterals,
  updateCollateral,
  removeCollateral,
} = collaterals.actions;
export default collaterals.reducer;
