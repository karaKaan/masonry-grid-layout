import * as S from "./Search.styled";
type SearchProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Search = (props: SearchProps) => {
  return (
    <S.SearchWrapper>
      <label htmlFor="search">Search</label>
      <input type="search" placeholder="Search" onChange={props.onChange} />
    </S.SearchWrapper>
  );
};
