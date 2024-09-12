import { useState, useEffect } from "react";
import { unsplash } from "../utils/unsplash";

export interface Photo {
  id: string;
  alt_description: string | null;
  urls: { small: string; full: string };
  user: { name: string };
  width: number;
  height: number;
  created_at: string;
}

interface UsePhotosResult {
  photos: Photo[];
  loading: boolean;
  hasMore: boolean;
  error: string | null;
}

export const usePhotos = (
  query: string = "nature",
  pageNumber: number
): UsePhotosResult => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const abortController = new AbortController();
    const signal = abortController.signal;

    unsplash.search
      .getPhotos({ query, page: pageNumber, perPage: 30 }, { signal })
      .then((result) => {
        if (!signal.aborted) {
          const fetchedPhotos = result.response?.results ?? [];
          setPhotos((prevPhotos) =>
            pageNumber === 1 ? fetchedPhotos : [...prevPhotos, ...fetchedPhotos]
          );
          setHasMore(fetchedPhotos.length > 0);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (!signal.aborted) {
          console.error("Error fetching photos:", error);
          setError("Failed to fetch photos. Please try again.");
          setLoading(false);
        }
      });

    return () => {
      abortController.abort();
    };
  }, [query, pageNumber]);

  return { photos, loading, hasMore, error };
};
