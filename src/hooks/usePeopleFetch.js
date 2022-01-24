import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, [countries]);

  async function fetchUsers() {
    setIsLoading(true);
    const countriesFilter = countries === [] ? '' : `&nat=${countries.toString()}`;
    const response = await axios.get(`https://randomuser.me/api/?results=25&page=1${countriesFilter}`);
    setIsLoading(false);
    setUsers(response.data.results);
  }

  return { users, isLoading, fetchUsers, countries, setCountries };
};
