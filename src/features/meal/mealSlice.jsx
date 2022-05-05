import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  meals: {},
  mealsMOTD: {},
  mealsArea: {},
};

const mealSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    addmealscat: (state, { payload }) => {
      state.meals = payload;
    },
    addmealsMOTD: (state, { payload }) => {
      state.mealsMOTD = payload;
    },
    addmealsArea: (state, { payload }) => {
      state.mealsArea = payload;
    },
  },
});

export const { addmealscat, addmealsMOTD, addmealsArea } = mealSlice.actions;
export const getallmeals = (state) => state.meals.meals;
export default mealSlice.reducer;
