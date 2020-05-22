// React Imports
import React from "react";

// Styling Imports
import "./search_bar_styles.scss"

// SearchBarFormField defines how each dropdown search bar should look like
const SearchBarFormField = ( {placeholder, labels} ) => {
    return (
        <select className="dropdown-search-field">
            <option value='-1'> {placeholder} </option>
            {
                // Iterate through each label in the list
                labels.map((i, j) => {
                    return <option key={i} value={i}>{i}</option>
                })
            }
        </select> 
    );
}

export default SearchBarFormField;