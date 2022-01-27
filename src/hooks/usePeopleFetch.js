import { useState, useEffect, useRef } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [page, setPage] = useState(1);
  const [seed, setSeed] = useState(null);
  const [loader, setLoader] = useState(null);
  
  // Increment page number count when target element is visible to user.
  // entries - array of target intersecting elements being watched by the IntersectionObserver.
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
    return () => {  // Cleanup function
      if (loader) {
          currentObserver.unobserve(loader);
      }
    };
  }, [loader]);

  async function fetchUsers() {
    setIsLoading(true);
    const countriesFilter = countries === [] ? '' : `&nat=${countries.toString()}`;
    const seedParameterString = seed ? `&seed=${seed}` : '';
    const response = await axios.get(`https://randomuser.me/api/?results=25&page=${page}${seedParameterString}${countriesFilter}`);
    if (page === 1) {
      setUsers(response.data.results);
      setSeed(response.data.info.seed);
    } else {
      setUsers([...users, ...response.data.results]);
    }
    setIsLoading(false);
  }

  return { users, isLoading, countries, setCountries, setPage, setLoader, setSeed };
};
