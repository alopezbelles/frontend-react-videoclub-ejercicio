import { createSlice } from "@reduxjs/toolkit";

export const filmSlice = createSlice({
  name: "film",
  initialState: {
    details: {},
    query: "",
    search: [],
    loans: [],
    byDirector: [],
  },
  reducers: {
    addFilm: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    addSearch: (state, action) => {
      return {
        ...state,
        search: action.payload,
      };
    },
    addCriteria: (state, action) => {
      return {
        ...state,
        query: action.payload,
      };
    },
    addLoans: (state, action) => {
      return {
        ...state,
        loans: action.payload
      }
    },
    addByDirector: (state, action) => {
      return {
        ...state,
        byDirector: action.payload
      }
    }
  },
});

export const { addFilm, addSearch, addCriteria, addByDirector } = filmSlice.actions;

export const filmData = (state) => state.film;
export const directorData = (state) => state.film.byDirector;
export default filmSlice.reducer;
