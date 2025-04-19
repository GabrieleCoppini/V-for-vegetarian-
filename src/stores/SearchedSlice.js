import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  searchedData: [],
  loading: false,
  error: null,
};

export const fetchSearched = createAsyncThunk("fetchSearched", async (name) => {
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}&diet=vegetarian&number=200`
  );
  console.log(response.data);
  return response.data.results;
});

const searchedSlice = createSlice({
  name: "searched",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearched.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearched.fulfilled, (state, action) => {
        state.loading = false;
        state.searchedData = action.payload;
      })
      .addCase(fetchSearched.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default searchedSlice.reducer;
