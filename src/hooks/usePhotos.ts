import { useEffect, useState } from 'react';
import { Photo } from '../types/photo';
import { fetchAllPhotos } from '../db/photoRepository';

export function usePhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const loadPhotos = async () => {
    const all = await fetchAllPhotos();
    setPhotos(all);
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  return { photos, loadPhotos, setPhotos };
}
