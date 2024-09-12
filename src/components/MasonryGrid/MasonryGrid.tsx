import * as S from "./MasonryGrid.styled";
import { usePhotos } from "../../hooks/usePhotos";
import { useCallback, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "../Search/Search";
import { useDebouncedCallback } from "use-debounce";
import { Container } from "../Container/Container";

export const MasonryGrid = () => {
  const [query, setQuery] = useState("nature");
  const [pageNumber, setPageNumber] = useState(1);
  const { photos, loading, hasMore } = usePhotos(query, pageNumber);
  const memoizedPhotos = useMemo(() => photos, [photos]);

  const observer = useRef<IntersectionObserver | null>(null);
  const columnCount = 3; 

  const lastPhotoRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const debouncedSearch = useDebouncedCallback((newQuery: string) => {
    setQuery(newQuery);
    setPageNumber(1);
  }, 500);

  const columns = useMemo(() => {
    const cols: any[][] = Array.from({ length: columnCount }, () => []);
    memoizedPhotos.forEach((photo, index) => {
      cols[index % columnCount].push(photo);
    });
    return cols;
  }, [memoizedPhotos, columnCount]);

  return (
    <Container>
      <Search onChange={(e) => debouncedSearch(e.target.value)} />
      <S.Grid>
        {columns.map((column, columnIndex) => (
          <S.Column key={columnIndex}>
            {column.map((photo, photoIndex) => (
              <S.PhotoItem
                key={photo.id}
                ref={
                  columnIndex === columnCount - 1 &&
                  photoIndex === column.length - 1
                    ? lastPhotoRef
                    : null
                }
              >
                <Link to={`/photo/${photo.id}`}>
                  <img
                    src={photo.urls.small}
                    alt={photo.alt_description ?? "No description available!"}
                  />
                </Link>
              </S.PhotoItem>
            ))}
          </S.Column>
        ))}
      </S.Grid>
      {loading && <div>Loading more photos...</div>}
    </Container>
  );
};
