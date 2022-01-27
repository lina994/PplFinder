import { useState, useEffect, useRef } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(null);
  
  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          setPage((n) => n + 1);
        }
      }
    )
  );

  useEffect(() => {
    fetchUsers();
  }, [countries, page]);

  useEffect(() => {
    const currentObserver = observer.current;
    if (loader) {
      currentObserver.observe(loader);
    }
    return () => {
      if (loader) {
          currentObserver.unobserve(loader);
      }
    };
  }, [loader]);

  async function fetchUsers() {
    setIsLoading(true);
    const countriesFilter = countries === [] ? '' : `&nat=${countries.toString()}`;
    const response = await axios.get(`https://randomuser.me/api/?results=25&page=${page}${countriesFilter}`);
    if (page === 1) {
      setUsers(response.data.results);
    } else {
      setUsers([...users, ...response.data.results]);
    }
    setIsLoading(false);
  }

  return { users, isLoading, countries, setCountries, setPage, setLoader };
};
