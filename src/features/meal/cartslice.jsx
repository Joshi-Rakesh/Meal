import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartslice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtocart: (state, { payload }) => {
      const ItemIndex = state.cart.findIndex(
        (item) =>
          (item.idMeal || item.recipe.url) ===
          (payload.idMeal || payload.recipe.url)
      );

      if (ItemIndex >= 0) {
        state.cart[ItemIndex].qty += 1;
      } else {
        const tempProduct = { ...payload, qty: 1 };
        state.cart.push(tempProduct);
      }
    },
    decquantity(state, { payload }) {
      const itemIndex = state.cart.findIndex(
        (item) =>
          (item.idMeal || item.recipe.url) ===
          (payload.idMeal || payload.recipe.url)
      );
      state.cart[itemIndex].qty -= 1;
    },
    incquantity(state, { payload }) {
      const itemIndex = state.cart.findIndex(
        (item) =>
          (item.idMeal || item.recipe.url) ===
          (payload.idMeal || payload.recipe.url)
      );
      state.cart[itemIndex].qty += 1;
    },

    remove: (state, { payload }) => {
      const newcart = state.cart.filter(
        (cart) =>
          (cart.idMeal || cart.recipe.url) !==
          (payload.idMeal || payload.recipe.url)
      );
      state.cart = newcart;
    },
  },
});

export const { addtocart, decquantity, incquantity, remove } =
  cartslice.actions;
export default cartslice.reducer;
