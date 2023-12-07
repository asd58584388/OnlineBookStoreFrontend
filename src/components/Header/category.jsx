import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getBookCategory } from "../apiService";
import * as CONSTANTS from "../redux/actionTypes";
import { getBooksByCategory } from "../googlebookapi";

const Category = ({ search }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch data from the backend
        getBookCategory().then((data) => { 
            // console.log(data);
            setCategories(data.categories);
        });
    }, []);

    const handleCategoryClick = (e) => {
        console.log(e.target.dataset.name);
        console.log(search);
        getBooksByCategory(e.target.dataset.name).then((data) => { 
            search(data);
        });
    };

    return (
        <div className="category-container">
            <ul className="category-list" onClick={handleCategoryClick}>
                {categories.map((category,index) => (
                    <li key={index} data-name={category}>
                        {/* <button> */}
                            {category}
                        {/* </button> */}
                    </li>
                ))}
            </ul>
        </div>
    );
};



const mapDispatchToProps = (dispatch) => {
    return {
        search: (searchResult) =>
            dispatch({ type: CONSTANTS.SEARCH, payload: {...searchResult,emptyBooks:true }}),
    };
};

export default connect(null, mapDispatchToProps)(Category);

