import { createSlice } from "@reduxjs/toolkit";
import { calcTotlaItems, calcTotlaPrice } from "../utils";

const initialState = {
  items: [],
  totalItemsAmount: 0,
  totalItemsPrice: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const isExisting = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (isExisting) {
        isExisting.qty += 1;
      } else {
        state.items.push({ ...action.payload, qty: 1 });
      }
      state.totalItemsAmount = calcTotlaItems(state.items);
      state.totalItemsPrice = calcTotlaPrice(state.items);
    },
    decrementItemAmount: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          item.qty = item.qty > 1 ? item.qty - 1 : item.qty;
        }
        return item;
      });
      state.totalItemsAmount = calcTotlaItems(state.items);
      state.totalItemsPrice = calcTotlaPrice(state.items);
    },
    resetItemAmount: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          item.qty = 1;
        }
        return item;
      });
      state.totalItemsAmount = calcTotlaItems(state.items);
      state.totalItemsPrice = calcTotlaPrice(state.items);
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.totalItemsAmount = calcTotlaItems(state.items);
      state.totalItemsPrice = calcTotlaPrice(state.items);
    },
    clearCart: (state, action) => {},
  },
});

export default counterSlice.reducer;
export const {
  addItem,
  decrementItemAmount,
  deleteItem,
  resetItemAmount,
  clearCart,
} = counterSlice.actions;
