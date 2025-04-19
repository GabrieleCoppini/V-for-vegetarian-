import React from "react";
import  Home from "./Home";
import Searched from "./Searched";
import Recipe from "./Recipe";
import {  Route, Routes } from "react-router-dom";
import {useLocation} from "react-router-dom";
import FavoritePage from "./FavoritePage";



const Pages = () => {

    const location = useLocation();

    return (

        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/searched/:searchTerm" element={<Searched />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="/favorites" element={<FavoritePage />} />

            
        
    </Routes>


         
      
    );
};

export default Pages;


