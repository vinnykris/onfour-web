// React Imports
import React, { useState, useEffect } from "react";

// Component Imports
import SearchBarFormField from "./search_bar_form_field";

// Styling Imports
import { Grid, Row, Col } from "../grid";
import "./search_bar_styles.scss"

const SearchBar = () => {
    const [genre_labels, setGenreLabels] = useState(["Indie", "Rock", "Jazz"]);
    const [artist_labels, setArtistLabels] = useState(["Jonathan Dely", "Stout", "Grasso"]);
    const [date_labels, setDateLabels] = useState(["May 10", "May 20", "May 30"]);

    useEffect(() => {
        // DO API CALL HERE
        // TEMPORARILY HARD CODE LIST
    }, []);

    return (
        <Grid className="search-bar-grid">
            <Row className="search-bar">
                <Col size={1}>
                    <SearchBarFormField placeholder={"Select Genre"} labels={genre_labels}></SearchBarFormField>
                </Col>
                <Col size={1}>
                    <SearchBarFormField placeholder={"Select Artist"} labels={artist_labels}></SearchBarFormField>
                </Col>
                <Col size={1}>
                    <SearchBarFormField placeholder={"Select Date"} labels={date_labels}></SearchBarFormField>
                </Col>
            </Row>
        </Grid>
    );
}

export default SearchBar;