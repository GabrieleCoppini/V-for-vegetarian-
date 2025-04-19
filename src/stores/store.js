import { configureStore } from "@reduxjs/toolkit";
import cuisineReducer from "./CuisineSlice";
import searchedReducer from "./SearchedSlice";
import recipeReducer from "./RecipeSlice";
import bookmarksReducer from "./BookMarksSlice";

const store = configureStore({
  reducer: {
    cuisine: cuisineReducer,
    searched: searchedReducer,
    recipe: recipeReducer,
    bookmarks: bookmarksReducer,
  },
});

export default store;
