import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Pages from "./pages/Pages";
import Search from "./components/Search";
import Home from "./pages/Home";


function App() {
  return <div className="App">
    <BrowserRouter>
       <Search />
       <Home  />
       <Pages />
    </BrowserRouter>
  </div>;
}

export default App;
