import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipeInfo, clearRecipe } from '../stores/RecipeSlice';
import { addBookmark, removeBookmark } from '../stores/BookMarksSlice'; 
import { selectIsRecipeBookmarked } from '../utils/helpers';
import { useParams } from 'react-router-dom';
import BookmarkIcon from '../components/BookmarkIcon';
import { ImSpoonKnife } from "react-icons/im";
import { handleImgError } from '../utils/helpers';
import '../style/Recipe.css';

const Recipe = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { recipeData, loading, error } = useSelector((state) => state.recipe);
    const isBookmarked = useSelector((state) => selectIsRecipeBookmarked(state, recipeData));

    const [servings, setServings] = useState(1);


    

    useEffect(() => {
        dispatch(fetchRecipeInfo(id));

        return () => {
            dispatch(clearRecipe());
        };
    }, [dispatch, id]);



    // const handleBookmarkToggle = () => {
    //     if (isBookmarked) {
    //         dispatch(removeBookmark(recipeData.title));
    //     } else {
    //         dispatch(addBookmark(recipeData));
    //     }
    // };

    const incrementServings = () => {
        setServings(prev => prev + 1);
    };

    const decrementServings = () => {
        if (servings > 1) {
            setServings(prev => prev - 1);
        }
    };

    if (loading) {
        return <div>Caricamento...</div>;
    }

    if (error) {
        return <div>Errore: {error}</div>;
    }

    if (!recipeData) {
        return <div>Nothing, recipes found 
            Please Try again.</div>;
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
                {

        recipeData.image &&  <img 
        src={recipeData.image}
        alt={recipeData.title}
        onError={handleImgError}
        style={{ width: '100%', height: 'auto' }}
    />}
                <div className="rec-desc">
                    <h2>Description</h2>
                    <p dangerouslySetInnerHTML={{ __html: recipeData.summary }}></p> 
                </div>
            </div>

            <div className="rec-servings">
                <div className="servings-counter">
                    <ImSpoonKnife size="1.5em" />
                    <h3>Serving</h3>
                    <button onClick={decrementServings}>-</button>
                    <span>{servings}</span>
                    <button onClick={incrementServings}>+</button>
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
                        {recipeData.extendedIngredients.map((ingredient) => {
                            const ingredientAmount = (ingredient.amount / recipeData.servings) * servings;
                            const displayAmount = (servings === 1 && ingredientAmount < 1) ? "1/2" : ingredientAmount.toFixed(2).replace(/\.00$/, '');
                            return (
                                <li key={ingredient.id}>
                                    {`${displayAmount} ${ingredient.unit} ${ingredient.name}`}
                                </li>
                            );
                        })}
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