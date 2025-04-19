import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSearched } from "../stores/SearchedSlice"; 
import { useParams, Link } from "react-router-dom";
import BookmarkIcon from "../components/BookmarkIcon";
import "../style/Searched.css";
import { handleImgError } from "../utils/helpers";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const Searched = () => {
    const dispatch = useDispatch();
    const { searchedData, loading, error } = useSelector((state) => state.searched);
    const { searchTerm } = useParams();

    useEffect(() => {
        dispatch(fetchSearched(searchTerm));
    }, [dispatch, searchTerm]);

    if (loading) {
        return <div>
             <AiOutlineLoading3Quarters className="loading-icon" />
        </div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="searched">
            <h1>Search Results for: {searchTerm}</h1>
            <div className="grid-searched">
                {searchedData.length === 0 ? ( 
                    <h3>No results available</h3>
                ) : (
                    searchedData.map((item) => (
                        <div key={item.id} className="card-searched">
                            <div>
                                <div className="searched-title">
                                    <h3>{item.title}</h3>
                                    <BookmarkIcon recipe={item} />
                                </div>
                                <img 
                                src={item.image}
                                 alt={item.title}
                                 onError={handleImgError}
                                  />
                                <Link to={`/recipe/${item.id}`}>
                                    <button className="searched-button">Let's cook</button>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Searched;