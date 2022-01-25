import React from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch, useFavoritesFetch } from "hooks";
import * as S from "./style";

const Home = () => {
  const { users, isLoading, countries, setCountries } = usePeopleFetch();
  const { isFavorite, toggleFavorite } = useFavoritesFetch();

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList users={users} isLoading={isLoading} countries={countries} setCountries={setCountries} isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
      </S.Content>
    </S.Home>
  );
};

export default Home;
