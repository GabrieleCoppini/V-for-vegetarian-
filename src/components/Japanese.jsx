import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJapaneseCuisine } from "../stores/CuisineSlice";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Link } from "react-router-dom";
import { useState } from "react";
import BookmarkIcon from "./BookmarkIcon";
import japan from "../assets/icons/japan.png";

import "../style/Splide-Splideslide.css"; 
import "../style/Cuisine.css";

const Japanese = () => {
    const dispatch = useDispatch();
    const { japaneseData, loading, error } = useSelector((state) => state.cuisine);
    const [recipeNames, setRecipeNames] = useState([]);
  
    useEffect(() => {
      
      dispatch(fetchJapaneseCuisine());
    }, [dispatch]);
  
    useEffect(() => {

      if (japaneseData.length > 0) {
        const names = japaneseData.map(recipe => recipe.title);
        setRecipeNames(names);
        localStorage.setItem("japaneseData", JSON.stringify(names)); 
      }
    }, [japaneseData]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  if (!Array.isArray(japaneseData)) {
    return <div>No data available</div>;
  }

  return (
    <div className="wrapper">
      <div className="ctn-j">
      <h1 className="text-h">japanese Recipes</h1>
     <img src={japan} alt="japanese" />
      </div>

    
  
    
      <Splide
              options={{
                
               
                arrows: true,
                pagination: false,
                drag: 'free',
                gap: '10px',
             
              }}
            >
        {japaneseData.map((recipe) => (
      <SplideSlide 
      key={recipe.id}
      className="splideSlide"
      // style={{
      //   display: 'flex',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   maxWidth: '16vw', 
      //   margin: 0,
      //   cursor: 'pointer',
      // }}
    >
            <div className="card">
            <div className="recipe-info">
            <div className="recipe-title">
              {/* <div className="texture-recipe"> */}
              <h3>{recipe.title}</h3>
              {/* </div> */}
             
              </div>
              <Link to={'/recipe/' + recipe.id}>
                <img src={recipe.image} alt={recipe.title} />
              </Link>
             
              
             <div className="recipe-button">
             <BookmarkIcon recipe={recipe} />
             <Link to={'/recipe/' + recipe.id}>
                  <button>let's cook</button>
                </Link>
             </div>
              </div>
              </div>
                

              
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Japanese;