import React from "react";
import User from "components/User";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import * as S from "./style";

const UserList = ({ users, isLoading, countries, setCountries, isFavorite, toggleFavorite, setLoader, setPage, setSeed }) => {

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
        {users.map((user, index) => <User user={user} index={index} isFavorite={isFavorite} toggleFavorite={toggleFavorite} />)}
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
