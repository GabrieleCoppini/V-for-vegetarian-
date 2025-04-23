import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  italianData: [],
  japaneseData: [],
  loading: false,
  error: null,
};

export const fetchItalianCuisine = createAsyncThunk(
  "fetchItalianCuisine",
  async () => {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=italian&excludeIngredients=fish,meat`
    );
    console.log(response.data);
    return response.data.results;
  }
);

export const fetchJapaneseCuisine = createAsyncThunk(
  "fetchJapaneseCuisine",
  async () => {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=japanese&excludeIngredients=fish,meat&number=12`
    );
    console.log(response.data);
    return response.data.results;
  }
);

const cuisineSlice = createSlice({
  name: "cuisine",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchItalianCuisine.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItalianCuisine.fulfilled, (state, action) => {
        state.loading = false;
        state.italianData = action.payload;

        localStorage.setItem("italianData", JSON.stringify(action.payload));
      })
      .addCase(fetchItalianCuisine.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(fetchJapaneseCuisine.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJapaneseCuisine.fulfilled, (state, action) => {
        state.loading = false;
        state.japaneseData = action.payload;

        localStorage.setItem("japaneseData", JSON.stringify(action.payload));
      })
      .addCase(fetchJapaneseCuisine.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setItalianData, setJapaneseData } = cuisineSlice.actions;
export default cuisineSlice.reducer;
