import { useState, useEffect } from "react";

export const useFavoritesFetch = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchFavorites();
  }, []);

  function fetchFavorites() {
    setIsLoading(true);
    const storage = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsLoading(false);
    setFavorites(storage);
  }

  function isFavorite(user) {
    return favorites.reduce((acc, favorite) => acc || (favorite.login.uuid === user.login.uuid), false);
  }

  function toggleFavorite(user) {
    const filtredList = favorites.filter((favorite) => favorite.login.uuid !== user.login.uuid);
    if (filtredList.length === favorites.length) { // add
      filtredList.push(user);
      localStorage.setItem('favorites', JSON.stringify(filtredList));
      setFavorites(filtredList);
    } else { // remove
      localStorage.setItem('favorites', JSON.stringify(filtredList));
      setFavorites(filtredList);
    }
  }

  return { favorites, isFavorite, toggleFavorite, isLoading };
};
