import React from "react";
import  Home from "./Home";
import Searched from "./Searched";
import Recipe from "./Recipe";
import { BrowserRouter as Router, Route, Switch, Redirect, Routes, Navigate } from 'react-router-dom';
import {useLocation} from "react-router-dom";
import FavoritePage from "./FavoritePage";
import { AnimatePresence } from "framer-motion";



const Pages = () => {

    const location = useLocation();

    return (
        
        <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/Home" />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/searched/:searchTerm" element={<Searched />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/favorites" element={<FavoritePage />} />

    </Routes>
    </AnimatePresence>


         
      
    );
};

export default Pages;


