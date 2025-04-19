import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeBookmark, selectAllBookmarks } from '../stores/BookMarksSlice';
import { useParams } from 'react-router-dom';
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from 'react-router-dom';
import '../style/FavoritePage.css';

const FavoritesPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const favorites = useSelector(selectAllBookmarks);

    const handleRemoveBookmark = (recipeTitle) => {
        console.log("Removing bookmark:", recipeTitle);
        dispatch(removeBookmark(recipeTitle)); 
    };

    if (favorites.length === 0) {
        return <div className="no-favorites">Nessun preferito trovato.</div>;
    }

    return (
        <div>
            <div className='favorite-ctn'>
                <ul>
                    <div className="favorite-list">
                        {favorites.map((recipe) => (
                            <div className='favorite-list-ctn' key={recipe.id}>
                                <div className="close-icon">
                                    <IoMdCloseCircle onClick={() => handleRemoveBookmark(recipe.title)} />
                                </div>
                                <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                        <img src={recipe.image} alt={recipe.title} style={{ width: '50px', height: '50px', marginRight: '10px', borderRadius: '50%', objectFit: 'cover' }} />
                                        <span>{recipe.title}</span>
                                    </li>
                                </Link>
                            </div>
                        ))}
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default FavoritesPage;