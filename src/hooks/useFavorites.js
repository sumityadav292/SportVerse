import { useCallback, useState } from "react";
import { favoritesService } from "../services/favoritesService";

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => favoritesService.getAll());

  const toggle = useCallback((type, id) => {
    setFavorites(favoritesService.toggle(type, id));
  }, []);

  const has = useCallback(
    (type, id) => favorites[type]?.includes(id),
    [favorites],
  );

  return { favorites, toggle, has };
}
