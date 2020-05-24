// Source: https://medium.com/swlh/create-a-responsive-grid-with-react-flexbox-styled-components-f7a55f607480

// Module imports
import styled from "styled-components";

// Define main grid container
export const Grid = styled.div``;

// Define flex grid container
export const FlexGrid = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

// Define main row container
export const Row = styled.div`
  display: flex;
`;

// Define flex grid container
export const FlexRow = styled.div`
  display: flex;
  flex: ${(props) => props.size};
`;

// Define main column container
export const Col = styled.div`
  flex: ${(props) => props.size};
`;
