import styled from "styled-components";
import { Container } from "../Container/Container.styled";

export const PhotoDetailContainer = styled(Container)`
  :first-child {
    margin-bottom: 1rem;
    svg {
      color: white;
      transition: all ease 250ms;
    }
    svg:hover {
      scale: 105%;
      transition: all ease 250ms;
    }
    svg:active {
      scale: 100%;
      transition: all ease 250ms;
    }
  }
`;
export const ImageAndContentWrapper = styled.div`
  display: flex;
  gap: 3em;
`;

export const ImageWrapper = styled.div`
  flex-basis: 60%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  img {
    width: 100%;
    height: auto;
  }
`;
export const ContentWrapper = styled.div`
  flex-basis: 40%;
  display: flex;
  flex-direction: column;
`;

export const TopContentSection = styled.p`
  font-size: 0.85rem;
  opacity: 0.7;
  :first-child {
    margin-bottom: 4px;
  }
`;
export const PhotoTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 0.25em;
`;
export const PhotoDescription = styled.p`
  font-size: 1.25rem;
`;
