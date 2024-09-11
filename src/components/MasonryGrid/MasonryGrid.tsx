import * as S from "./MasonryGrid.styled";
import { usePhotos } from "../../hooks/usePhotos";
import { useEffect, useRef, useState } from "react";

export const MasonryGrid = () => {
  const { photos, loading } = usePhotos();
  const [photoHeights, setPhotoHeights] = useState<number[]>([]);
  const imageRefs = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    if (photos.length > 0) {
      const updatedHeights = imageRefs.current.map((img) => {
        console.log({ img });
        return img ? img.offsetHeight : 0;
      });
      setPhotoHeights(updatedHeights);
    }
  }, [photos]);

  if (loading) return <div>Loading...</div>;

  return (
    <S.Grid>
      {photos.map((photo, index) => (
        <S.PhotoItem key={photo.id} height={photo.height}>
          <img
            ref={(el) => (imageRefs.current[index] = el!)}
            src={photo.urls.small}
            alt={photo?.alt_description ?? "No description available."}
            onLoad={() => {
              const updatedHeights = imageRefs.current.map((img) =>
                img ? img.offsetHeight : 0
              );
              setPhotoHeights(updatedHeights);
            }}
          />
        </S.PhotoItem>
      ))}
    </S.Grid>
  );
};
