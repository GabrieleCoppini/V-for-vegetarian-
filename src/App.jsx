import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Pages from "./pages/Pages";
import Search from "./components/Search";


function App() {
  return <div className="App">
    <BrowserRouter>
       <Search />
       <Pages />
    </BrowserRouter>
  </div>;
}

export default App;
