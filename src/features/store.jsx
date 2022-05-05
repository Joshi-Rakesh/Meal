import { configureStore } from "@reduxjs/toolkit";
import mealReducer from "./meal/mealSlice";
import locationReducer from "./meal/varietySlice";
import cartReducer from "./meal/cartslice";

export const store = configureStore({
  reducer: {
    meals: mealReducer,
    location: locationReducer,
    cart: cartReducer,
  },
});
