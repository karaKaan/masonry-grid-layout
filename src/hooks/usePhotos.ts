import { useState, useEffect } from "react";
import { unsplash } from "../utils/unsplash";

interface Photo {
  id: string;
  alt_description: string | null;
  urls: { small: string; full: string };
  user: { name: string };
  width: number;
  height: number;
  created_at: string;
}

export const usePhotos = (query: string = "nature", pageNumber: number) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);
    unsplash.search
      .getPhotos({ query, page: pageNumber, perPage: 30, })
      .then((result) => {
        const fetchedPhotos = result.response?.results || [];
        setPhotos((prevPhotos) => [...prevPhotos, ...fetchedPhotos]);
        setHasMore(fetchedPhotos.length > 0);
        setLoading(false);
      });
  }, [query, pageNumber]);

  return { photos, loading, hasMore };
};
