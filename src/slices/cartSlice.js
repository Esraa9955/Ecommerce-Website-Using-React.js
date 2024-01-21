import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    // Add To Cart
    addToCart: (state, action) => {
      let existsItemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

      if (existsItemIndex >= 0) {
        // If the item already exists in the cart, update the quantity
        state.cartItems[existsItemIndex].quantity += 1;
      } else {
        // If the item is not in the cart, add it with a quantity of 1
        const newItem = { ...action.payload, quantity: 1 };
        state.cartItems.push(newItem);
      }

      // Update local storage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    // Remove from Cart
    removeFromCart: (state, action) => {
      let existsItemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

      if (existsItemIndex >= 0) {
        // If the item exists in the cart, decrease the quantity
        state.cartItems[existsItemIndex].quantity -= 1;

        if (state.cartItems[existsItemIndex].quantity <= 0) {
          // If quantity is zero or less, remove the item from the cart
          state.cartItems.splice(existsItemIndex, 1);
        }
      }

      // Update local storage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    // Clear Cart
    clearCart: (state) => {
      state.cartItems = [];

      // Clear local storage
      localStorage.removeItem('cartItems');
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
