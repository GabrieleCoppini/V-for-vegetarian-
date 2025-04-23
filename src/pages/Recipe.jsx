import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipeInfo, clearRecipe } from '../stores/RecipeSlice';
import Ingredient from '../components/Ingredients';
import { useParams } from 'react-router-dom';
import BookmarkIcon from '../components/BookmarkIcon';
import { ImSpoonKnife } from "react-icons/im";
import { handleImgError } from '../utils/helpers';
import '../style/Recipe.css';

const Recipe = () => {
    const [numOfGuests, setNumOfGuests] = useState(1);
    const dispatch = useDispatch();
    const { id } = useParams();
    const { recipeData, loading, error } = useSelector((state) => state.recipe);

    useEffect(() => {
        dispatch(fetchRecipeInfo(id));

        return () => {
            dispatch(clearRecipe());
        };
    }, [dispatch, id]);

    const incrementGuests = () => {
        setNumOfGuests(prev => prev + 1);
    };

    const decrementGuests = () => {
        if (numOfGuests > 1) {
            setNumOfGuests(prev => prev - 1);
        }
    };

    if (loading) {
        return <div>Caricamento...</div>;
    }

    if (error) {
        return <div>Errore: {error}</div>;
    }

    if (!recipeData) {
        return <div>Nessuna ricetta trovata. Per favore riprova.</div>;
    }

    return (
        <div className="rec-container">
            <div className="rec-ctn">
                <div className="rec-title">
                    <h1>{recipeData.title}</h1>
                </div>
                <div className="bookmark-icon">
                    <BookmarkIcon recipe={recipeData} />
                </div>
            </div>

            <div className="rec-img-desc">
                {recipeData.image && (
                    <img 
                        src={recipeData.image}
                        alt={recipeData.title}
                        onError={handleImgError}
                        style={{ width: '100%', height: 'auto' }}
                    />
                )}
                <div className="rec-desc">
                    <h2>Description</h2>
                    <p dangerouslySetInnerHTML={{ __html: recipeData.summary }}></p> 
                </div>
            </div>

            <div className="rec-servings">
                <div className="servings-counter">
                    <ImSpoonKnife size="1.5em" />
                    <h3>Serving</h3>
                    <button onClick={decrementGuests}>-</button>
                    <input
                       
                        value={numOfGuests}
                        onChange={(e) => setNumOfGuests(Math.max(1, e.target.value))}
                    />
                    <button onClick={incrementGuests}>+</button>
                </div>

                <div className="rec-time">
                    <p>Ready in {recipeData.readyInMinutes} minutes</p>
                </div>
            </div>

            <div className="rec-ii">
                <div className="rec-ingredients">
                    <div className="rec-ing-title">
                        <h2>Ingredients</h2>
                    </div>
                    <ul>
                        {recipeData.extendedIngredients.map((ingredient) => (
                            <Ingredient
                                key={ingredient.id}
                                ingredients={ingredient}
                                servings={recipeData.servings}
                                numOfGuests={numOfGuests}
                            />
                        ))}
                    </ul>
                </div>

                <div className="rec-instructions">
                    <h2>Instructions</h2>
                    <p dangerouslySetInnerHTML={{ __html: recipeData.instructions }}></p>
                </div>
            </div>
        </div>
    );
};

export default Recipe;