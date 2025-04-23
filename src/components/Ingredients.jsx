import { formatIngredient } from "../utils/helpers";

function Ingredient({ ingredients, servings, numOfGuests }) {
  const { id, amount, unit, name } = ingredients;
  return (
    <li key={id}>
      {amount
        ? formatIngredient(amount, servings, numOfGuests, unit, name)
        : name}
    </li>
  );
}

export default Ingredient;