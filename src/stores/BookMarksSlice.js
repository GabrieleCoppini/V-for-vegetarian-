import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookmarks: JSON.parse(localStorage.getItem("recipeTitles")) || [],
};

const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      const recipe = action.payload;
      const exists = state.bookmarks.find(
        (bookmark) => bookmark.title === recipe.title
      );
      if (!exists) {
        state.bookmarks.push(recipe);
        localStorage.setItem("recipeTitles", JSON.stringify(state.bookmarks));
      }
    },
    removeBookmark: (state, action) => {
      const title = action.payload;
      state.bookmarks = state.bookmarks.filter(
        (bookmark) => bookmark.title !== title
      );
      localStorage.setItem("recipeTitles", JSON.stringify(state.bookmarks));
    },
  },
});

export const selectAllBookmarks = (state) => state.bookmarks.bookmarks;

export const { addBookmark, removeBookmark } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
