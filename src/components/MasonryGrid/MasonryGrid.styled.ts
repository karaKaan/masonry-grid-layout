import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1em;
  grid-auto-flow: dense;
`;

export const PhotoItem = styled.div<{ height: number }>`
  grid-row-end: span ${({ height }) => Math.ceil(height / 1000)};
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
  }
`;
