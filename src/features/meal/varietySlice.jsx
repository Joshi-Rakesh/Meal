import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "Indian",
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    addlocation: (state, { payload }) => {
      state.location = payload;
    },
  },
});

export const { addlocation } = locationSlice.actions;
export default locationSlice.reducer;
