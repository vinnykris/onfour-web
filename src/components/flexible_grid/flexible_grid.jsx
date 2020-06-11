// React imports
import React, { useState, useEffect } from "react";

// Component imports
import { Grid, Row, Col } from "../grid";

// Styles imports
import "./flexible_grid_styles.scss";

// This grid dynamically displayed content based on numbers of columns specified
const FlexibleGrid = ({ content_list, num_cols }) => {
  const [chunks, setChunks] = useState([]); // List of chunks based on original list

  // Function that splits original array into chunks based on chunk size
  // Also adds empty elements to the last chunk if necessary.
  // Reference: https://stackoverflow.com/questions/8495687/split-array-into-chunks?page=1&tab=votes#tab-top
  const arrayChunks = (array, chunk_size) => {
    // Creates new array with original array split into chunks
    let chunk_array = Array(Math.ceil(array.length / chunk_size))
      .fill()
      .map((_, index) => index * chunk_size)
      .map((begin) => array.slice(begin, begin + chunk_size));

    if (!chunk_array.length) return [];

    let last_chunk_remainder =
      chunk_array[chunk_array.length - 1].length % chunk_size;

    // If last chunk has fewer than *chunk_size* elements, add empty elements to last chunk
    if (last_chunk_remainder) {
      let empty_array = Array(chunk_size - last_chunk_remainder).fill("");
      chunk_array.push(chunk_array.pop().concat(empty_array));
    }

    return chunk_array;
  };

  // Updates array of chunks if content_list or num_cols value changes
  useEffect(() => {
    setChunks(arrayChunks(content_list, num_cols));
  }, [content_list, num_cols]);

  return (
    <Grid>
      {chunks.map((chunk_list, row_index) => (
        <Row key={row_index} className="grid-row">
          {chunk_list.map((element, col_index) => (
            <Col size={1} key={col_index} className="black-element">
              {element}
            </Col>
          ))}
        </Row>
      ))}
    </Grid>
  );
};

export default FlexibleGrid;
