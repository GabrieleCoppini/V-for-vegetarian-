import chef from "../assets/icons/chef.png";

export const selectIsRecipeBookmarked = (state, recipeData) => {
  if (!recipeData) return false;
  return state.bookmarks.bookmarks.some(
    (bookmark) => bookmark.title === recipeData.title
  );
};

export const handleImgError = function (e) {
  e.target.src = chef;
};
