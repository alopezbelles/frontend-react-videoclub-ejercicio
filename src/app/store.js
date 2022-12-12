import { configureStore } from "@reduxjs/toolkit";
import filmSlice from "../components/Films/filmSlice.js";

export default configureStore({
  reducer: {
    film: filmSlice
  },
});