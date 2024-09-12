import styled from "styled-components";

export const SearchWrapper = styled.div`
  input {
    border: 1px solid rgba(255, 255, 255, 0.8);
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
  }

  input:focus {
    border-color: var(--white);
  }
  label {
    display: block;
    margin-bottom: 10px;
    margin-left: 1px;
    font-size: 1.2rem;
  }
`;
