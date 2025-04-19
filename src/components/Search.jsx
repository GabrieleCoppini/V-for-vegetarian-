import {useState} from "react";
import { useNavigate } from "react-router-dom";
import {FaSearch} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/icons/logo.png";
import favoritesIcon from "../assets/icons/favoritesIcon.png";
import Favoritebutton from "./Favoritebutton";
import "../style/Search.css";


const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();


    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm) {
            navigate(`/searched/${searchTerm}`);
        }
    };

    return (
              <form className="search" onSubmit={handleSearch} >

              <div className="logo">
               <Link to="/">
               <div className="logo">
        <img src={logo} alt="Company Logo" style={{ width: '60px', height: 'auto', marginLeft: '2dvw'}} />
      </div>
               </Link>
             

              </div>
             

                <div className="search-box">
                <input type="text" placeholder="Search your vegetarian recipes" 
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                 />
                 <button type="submit" >
                 <FaSearch />
                 </button>
                 </div>

              <div  className="favorite-button">

              <Favoritebutton favorites={favoritesIcon} />
            
              </div>
               
              </form>

            
          
    )
}

export default Search