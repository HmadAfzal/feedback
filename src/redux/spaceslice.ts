import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Space } from "@/schemas/Space";

export interface SpaceState {
  space: Space[] | null;
}

const initialState: SpaceState = {
  space: null,
};

export const spaceSlice = createSlice({
  name: "space",
  initialState,
  reducers: {
    selectSpaces: (state, action: PayloadAction<Space[]>) => {
      state.space = action.payload;
    },
    addSpace: (state, action: PayloadAction<Space>) => {
      if (state.space) {
        state.space = [...state.space, action.payload];
      } else {
        state.space = [action.payload];
      }
    },
    clearSpaceSlice: (state) => {
      state.space = null;
    },
  },
});

export const { selectSpaces, addSpace, clearSpaceSlice } = spaceSlice.actions;

export const getSpaces = (state: RootState) => state.space?.space;

export default spaceSlice.reducer;
