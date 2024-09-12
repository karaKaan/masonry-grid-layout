import * as S from "./MasonryGrid.styled";
import { usePhotos, Photo } from "../../hooks/usePhotos";
import { useCallback, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "../Search/Search";
import { useDebouncedCallback } from "use-debounce";
import { Container } from "../Container/Container";

const COLUMN_COUNT = 3;
const DEBOUNCE_DELAY = 500;

export const MasonryGrid: React.FC = () => {
  const [query, setQuery] = useState("nature");
  const [pageNumber, setPageNumber] = useState(1);
  const { photos, loading, hasMore } = usePhotos(query, pageNumber);
  const memoizedPhotos = useMemo(() => photos, [photos]);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastPhotoRef = useCallback(
    (node: HTMLDivElement | null) => {
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
  }, DEBOUNCE_DELAY);

  const columns = useMemo(() => {
    const cols: Photo[][] = Array.from({ length: COLUMN_COUNT }, () => []);
    memoizedPhotos.forEach((photo, index) => {
      cols[index % COLUMN_COUNT].push(photo);
    });
    return cols;
  }, [memoizedPhotos]);

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
                  columnIndex === COLUMN_COUNT - 1 &&
                  photoIndex === column.length - 1
                    ? lastPhotoRef
                    : null
                }
              >
                <Link to={`/photo/${photo.id}`}>
                  <img
                    src={photo.urls.small}
                    alt={photo.alt_description ?? "No description available"}
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
