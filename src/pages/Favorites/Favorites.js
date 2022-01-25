import React from "react";
import Text from "components/Text";
import FavoritesList from "components/FavoritesList";
import { useFavoritesFetch } from "hooks";
import * as S from "./style";

const Favorites = () => {
  const { favorites, toggleFavorite, isLoading } = useFavoritesFetch();

  return (
    <S.Favorites>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            Favorites
          </Text>
        </S.Header>
        <FavoritesList users={favorites} toggleFavorite={toggleFavorite} isLoading={isLoading} />
      </S.Content>
    </S.Favorites>
  );
};

export default Favorites;
