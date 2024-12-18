import { createContext, useContext, useEffect, useState } from "react";
import CryptoJS from "crypto-js";

const publicKey = import.meta.env.VITE_APIKEY;
const privateKey = import.meta.env.VITE_PRIVATE_KEY;
const LIMIT = 20;

const HeroesContext = createContext(null);

export const HeroesProvider = ({ children }) => {
  const [heroes, setHeroes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [likedHeroes, setLikedHeroes] = useState(() => {
    const saved = localStorage.getItem("likedHeroes");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchMode, setSearchMode] = useState(false);

  const toggleLike = (hero) => {
    setLikedHeroes((prev) => {
      const heroExists = prev.find((h) => h.id === hero.id);
      const newLikedHeroes = heroExists
        ? prev.filter((h) => h.id !== hero.id)
        : [
            ...prev,
            {
              id: hero.id,
              name: hero.name,
              thumbnail: hero.thumbnail,
            },
          ];

      localStorage.setItem("likedHeroes", JSON.stringify(newLikedHeroes));

      return newLikedHeroes;
    });
  };

  const isHeroLiked = (heroId) => {
    return likedHeroes.some((hero) => hero.id === heroId);
  };

  const getHeroes = async () => {
    if (loading || !hasMore || searchMode) return;

    setLoading(true);
    const timestamp = Date.now().toString();
    const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();

    try {
      const baseUrl = "https://gateway.marvel.com/v1/public/characters";
      const params = new URLSearchParams({
        ts: timestamp,
        apikey: publicKey,
        hash: hash,
        limit: LIMIT,
        offset,
      });

      const response = await fetch(`${baseUrl}?${params}`);
      const data = await response.json();

      setHeroes((prev) => [...prev, ...data.data.results]);
      setOffset((prev) => prev + LIMIT);
      setHasMore(data.data.results.length === LIMIT);
    } catch (error) {
      console.error("Error fetching heroes:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchHeroes = (term) => {
    setSearchTerm(term);
    setSearchMode(!!term);

    if (term.length >= 2) {
      getSearchResults(term);
    } else {
      setSearchResults([]);
      setSearchMode(false);
    }
  };

  const getSearchResults = async (term) => {
    setLoading(true);
    const timestamp = Date.now().toString();
    const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();

    try {
      const baseUrl = "https://gateway.marvel.com/v1/public/characters";
      const params = new URLSearchParams({
        ts: timestamp,
        apikey: publicKey,
        hash,
        nameStartsWith: term,
        limit: LIMIT,
        offset: 0,
      });

      const response = await fetch(`${baseUrl}?${params}`);
      const data = await response.json();

      setSearchResults(data.data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHeroes();
  }, []);

  return (
    <HeroesContext.Provider
      value={{
        heroes,
        setHeroes,
        searchHeroes,
        searchTerm,
        loading,
        hasMore,
        loadMore: getHeroes,
        toggleLike,
        isHeroLiked,
        searchResults,
        searchMode,
        setSearchMode,
        likedHeroes,
      }}
    >
      {children}
    </HeroesContext.Provider>
  );
};

const useHeroes = () => {
  const context = useContext(HeroesContext);
  if (!context) {
    throw new Error("useHeroes must be used within a HeroesProvider");
  }
  return context;
};

export default useHeroes;
