import { useState } from "react";
import favoritesIcon from "../assets/icons/favoritesIcon.png";
import FavoritesPage from "../pages/FavoritePage";
import { useEffect } from "react"; 
import "../style/FavoriteButton.css";

const FavoritesButton = () => {
    const [showFavorites, setShowFavorites] = useState(false);

    const toggleFavorites = () => {
        setShowFavorites(!showFavorites);
    };

    const handleClickOutside = (event) => {
        if (showFavorites && !event.target.closest('.favorite-button-ctn')) {
            setShowFavorites(false);
        }
    };

   
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showFavorites]);

    return (
        <div>
            <div 
                className="favorite-button-ctn" 
                onClick={toggleFavorites} 
                aria-expanded={showFavorites}
                role="button"
                tabIndex={0} 
                onKeyPress={(e) => e.key === 'Enter' && toggleFavorites()} 
            >
                <img 
                    src={favoritesIcon} 
                    alt="Mostra Preferiti" 
                />
                <p>Your Favorites Recipes</p> 
            </div>

            {showFavorites && <FavoritesPage />} 
        </div>
    );
};

export default FavoritesButton;