import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItalianCuisine } from "../stores/CuisineSlice";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Link } from "react-router-dom";
import BookmarkIcon from "./BookmarkIcon";

import italian from "../assets/icons/italia.png";
import '@splidejs/react-splide/css';
import "../style/Cuisine.css";


const Italian = () => {
  const dispatch = useDispatch();
  const { italianData, loading, error } = useSelector((state) => state.cuisine);

  useEffect(() => {
    dispatch(fetchItalianCuisine());

  }, [dispatch]);

 

  useEffect(() => {
    if (italianData.length > 0) {
      
      localStorage.setItem("italianData", JSON.stringify(italianData));
    }
  }, [italianData]);



  console.log(italianData);
if (loading) {
  return <div>Loading...</div>;
}


  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="wrapper">
      <div className="ctn-h">
      <h1 className="text-h">Italian Recipes</h1>
     <img src={italian} alt="italia" />
      </div>

    
    
    
      <Splide
              options={{
               
               
                arrows: true,
                pagination: false,
                drag: 'free',
                gap: '10px',
             
              }}
            >
        {italianData.map((recipe) => (
           <SplideSlide
           key={recipe.id}
           style={{
             display: 'flex',
             justifyContent: 'center',
             alignItems: 'center',
             maxWidth: '16vw', 
             margin: 0,
             cursor: 'pointer',
           }}
         >
            <div className="card">
            <div className="recipe-info">
            <div className="recipe-title">
              
              <h3>{recipe.title}</h3>
             
             
             
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

export default Italian;