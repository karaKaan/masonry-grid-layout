import * as S from "./MasonryGrid.styled";
import { usePhotos } from "../../hooks/usePhotos";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

export const MasonryGrid = () => {
  const [query, setQuery] = useState("nature");
  const [pageNumber, setPageNumber] = useState(1);
  const { photos, loading, hasMore } = usePhotos(query, pageNumber);
  const [photoHeights, setPhotoHeights] = useState<number[]>([]);

  const imageRefs = useRef<HTMLImageElement[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);

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

  useEffect(() => {
    if (photos.length > 0) {
      const updatedHeights = imageRefs.current.map((img) => {
        return img ? img.offsetHeight : 0;
      });
      setPhotoHeights(updatedHeights);
    }
  }, [photos]);

  return (
    <S.Grid>
      {photos.map((photo, index) => {
        if (index === photos.length - 1) {
          return (
            <S.PhotoItem
              key={photo.id}
              height={photo.height}
              ref={lastPhotoRef}
            >
              <Link to={`/photo/${photo.id}`}>
                <img
                  src={photo.urls.small}
                  alt={photo.alt_description ?? "No description available!"}
                />
              </Link>
            </S.PhotoItem>
          );
        } else {
          return (
            <S.PhotoItem key={photo.id} height={photo.height}>
              <Link to={`/photo/${photo.id}`}>
                <img
                  src={photo.urls.small}
                  alt={photo.alt_description ?? "No description available!"}
                />
              </Link>
            </S.PhotoItem>
          );
        }
      })}
      {loading && <div>Loading more photos...</div>}
    </S.Grid>
  );
};
