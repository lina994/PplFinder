import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({ users, isLoading, countries, setCountries, isFavorite, toggleFavorite, setLoader, setPage, setSeed }) => {
  const [hoveredUserId, setHoveredUserId] = useState();

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const handleCheckBoxChange = (isChecked, country) => {
    if (isChecked) {
      setCountries([...countries, country]);
    } else {
      let updatedCountries = countries.filter((c) => c !== country);
      setCountries(updatedCountries);
    }
    setPage(1);
    setSeed(null);
  };

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox value="BR" label="Brazil" onChange={handleCheckBoxChange} />
        <CheckBox value="AU" label="Australia" onChange={handleCheckBoxChange} />
        <CheckBox value="CA" label="Canada" onChange={handleCheckBoxChange} />
        <CheckBox value="DE" label="Germany" onChange={handleCheckBoxChange} />
        <CheckBox value="CH" label="Switzerland" onChange={handleCheckBoxChange} />
      </S.Filters>
      <S.List>
        {users.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper isVisible={index === hoveredUserId || isFavorite(user)}>
                <IconButton onClick={() => toggleFavorite(user)} >
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
        {!isLoading && users.length != 0 && (
          <S.Loader ref={setLoader}></S.Loader>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
