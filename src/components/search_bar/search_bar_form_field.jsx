// React Imports
import React from "react";

// Styling Imports
import "./search_bar_styles.scss"

const SearchBarFormField = ( {placeholder, labels} ) => {
    return (
        <select>
            <option value='-1'> {placeholder} </option>
            {
                labels.map((i, j) => {
                    return <option key={i} value={i}>{i}</option>
                })
            }
        </select> 
    );
}

export default SearchBarFormField;