import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRecipeInfo = createAsyncThunk(
  "recipe/fetchRecipeInfo",
  async (id) => {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    console.log(response.data);
    return response.data;
  }
);

const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    recipeData: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearRecipe: (state) => {
      state.recipeData = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipeInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipeInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.recipeData = action.payload;
      })
      .addCase(fetchRecipeInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
