import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSclice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
