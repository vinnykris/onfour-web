// Source: https://medium.com/swlh/create-a-responsive-grid-with-react-flexbox-styled-components-f7a55f607480

import styled from "styled-components";

export const Grid = styled.div``;

export const FlexGrid = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Row = styled.div`
  display: flex;
`;

export const FlexRow = styled.div`
  display: flex;
  flex: ${(props) => props.size};
`;

export const Col = styled.div`
  flex: ${(props) => props.size};
`;
