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

export const usePhotos = (query: string = "nature") => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    unsplash.search.getPhotos({ query, perPage: 30 }).then((result) => {
      setPhotos(result.response?.results || []);
      setLoading(false);
    });
  }, [query]);

  return { photos, loading };
};
