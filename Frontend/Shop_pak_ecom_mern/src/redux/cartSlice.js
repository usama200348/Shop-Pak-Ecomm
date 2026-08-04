import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: JSON.parse(localStorage.getItem("cartItem")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItem.find(
        (x) => x.productId  === item.productId 
      );

      if (existItem) {
        state.cartItem = state.cartItem.map((x) =>
          x.productId === item.productId ? item : x
        );
      } else {
        state.cartItem.push(item);
      }
      localStorage.setItem('cartItems',JSON.stringify(state.cartItem));
    },

    removeFromCart: (state, action) => {
      state.cartItem = state.cartItem.filter(
        (item) => item.productId  !== action.payload
      );
      localStorage.setItem("cartItem",JSON.stringify(state.cartItem))
    },

   

    clearCart: (state) => {
      state.cartItem = [];
      localStorage.removeItem('cartItems')
    },

    increaseQty: (state, action) => {
  const item = state.cartItem.find(
    (x) => x.productId === action.payload
  );

  if (item) {
    item.qty += 1;
  }

  localStorage.setItem(
    "cartItem",
    JSON.stringify(state.cartItem)
  );
},

decreaseQty: (state, action) => {
  const item = state.cartItem.find(
    (x) => x.productId === action.payload
  );

  if (item && item.qty > 1) {
    item.qty -= 1;
  }

  localStorage.setItem(
    "cartItem",
    JSON.stringify(state.cartItem)
  );
},
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQty,
  decreaseQty
} = cartSlice.actions;

export default cartSlice.reducer;