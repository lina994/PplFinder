import React from "react";
import User from "components/User";
import Spinner from "components/Spinner";
import * as S from "./style";

const FavoritesList = ({ users, toggleFavorite, isLoading }) => {

  return (
    <S.FavoritesList>
      <S.List>
        {users.map((user, index) => <User user={user} index={index} isFavorite={() => true} toggleFavorite={toggleFavorite} />)}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.FavoritesList>
  );
};

export default FavoritesList;
