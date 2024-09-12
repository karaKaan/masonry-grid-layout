import styled from "styled-components";

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
`;

export const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

export const PhotoItem = styled.div`
  width: 100%;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
    transition: transform ease 250ms;
  }

  img:hover {
    transform: scale(1.05);
    transition: transform ease 250ms;
  }
`;
