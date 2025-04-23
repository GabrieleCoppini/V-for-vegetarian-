import chef from "../assets/icons/chef.png";
import Fraction from "fraction.js";

export const selectIsRecipeBookmarked = (state, recipeData) => {
  if (!recipeData) return false;
  return state.bookmarks.bookmarks.some(
    (bookmark) => bookmark.title === recipeData.title
  );
};

export const handleImgError = function (e) {
  e.target.src = chef;
};

export const formatIngredient = function (
  amount,
  servings,
  numOfGuests,
  unit,
  name
) {
  const totalAmount = (amount / servings) * numOfGuests;
  const integerPart = Math.trunc(totalAmount);
  const decimalPart = totalAmount - integerPart;

  const fractionPart =
    decimalPart > 0 ? new Fraction(decimalPart).toFraction(true) : "";

  return `${integerPart > 0 ? integerPart : ""} ${fractionPart} ${
    unit ? `${unit} of` : ""
  } ${name}`;
};
