import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [], // The cart holds an array of products with their variations
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const variation = action.payload; // Get the variation from the payload
      const variationId = `${variation.id}-${variation.selectedClasses}-${variation.selectedDate}`; // Create a unique ID for the variation

      const item = state.products.find(
        (item) => item.id_variation === variationId,
      ); // Check if the variation already exists
      if (item) {
        item.quantity += variation.quantity; // Increment the quantity if variation exists
      } else {
        state.products.push({
          ...variation,
          id: variation.id,
          id_variation: variationId,
          document_id: variation.document_id,
          quantity: variation.quantity || 1,
        }); // Add new variation
      }
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload,
      ); // Remove variation by its unique ID
    },
    incrementQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1; // Increment quantity
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1; // Decrement quantity
      } else if (item && item.quantity === 1) {
        state.products = state.products.filter(
          (product) => product.id !== action.payload,
        ); // Remove if quantity is 1
      }
    },
    clearCart: (state) => {
      state.products = []; // Clear all items from the cart
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
