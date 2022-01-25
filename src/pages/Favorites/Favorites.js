import React from "react";
import Text from "components/Text";
import * as S from "./style";

const Favorites = () => {

  return (
    <S.Favorites>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
              Favorites
          </Text>
        </S.Header>
      </S.Content>
    </S.Favorites>
  );
};

export default Favorites;
