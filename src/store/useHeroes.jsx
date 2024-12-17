import { createContext, useContext, useEffect, useState } from "react";
import CryptoJS from "crypto-js";

const publicKey = import.meta.env.VITE_APIKEY;
const privateKey = import.meta.env.VITE_PRIVATE_KEY;

const HeroesContext = createContext(null);

export const HeroesProvider = ({ children }) => {
  const [heroes, setHeroes] = useState([]);
  const [filteredHeroes, setFilteredHeroes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getHeroes = async () => {
    const timestamp = Date.now().toString();

    const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();

    try {
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setHeroes(data.data.results);
    } catch (error) {
      console.error("Error fetching heroes:", error);
    }
  };

  const searchHeroes = (term) => {
    setSearchTerm(term);
    const filtered = heroes.filter((hero) =>
      hero.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredHeroes(filtered);
  };

  useEffect(() => {
    getHeroes();
  }, []);

  useEffect(() => {
    setFilteredHeroes(heroes);
  }, [heroes]);

  return (
    <HeroesContext.Provider
      value={{ heroes, setHeroes, searchHeroes, filteredHeroes, searchTerm }}
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
