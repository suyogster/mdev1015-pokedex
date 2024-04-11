import React, { createContext, useState, useContext, useEffect } from 'react';

// Define interface for the data fetched from the Pokémon API
interface User {
  name: string;
  url: string;
  // Add other properties as needed
}

// Define context type
interface PokemonContextType {
  pokemonList: User[] | null;
  loading: boolean;
  error: Error | null | string;
  fetchPokemonData: () => void;
}

// Create context
const UserContext = createContext<PokemonContextType>({
  pokemonList: null,
  loading: false,
  error: null,
  fetchPokemonData: () => {},
});

// Custom hook for accessing Pokémon context
export const useUser = () => useContext(UserContext);

// Pokémon provider component
export const UserProvider = ({ children }) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null | string>(null);

  const fetchPokemonData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon');
      if (!response.ok) {
        throw new Error('Failed to fetch Pokémon data');
      }
      const json = await response.json();
      setPokemonList(json.results);
    } catch (error) {
      if (error) {
        setError(JSON.stringify(error));
      }
      return setError(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Pokémon data on component mount
  useEffect(() => {
    fetchPokemonData();
  }, []);

  return (
    <UserContext.Provider
      value={{ pokemonList, loading, error, fetchPokemonData }}
    >
      {children}
    </UserContext.Provider>
  );
};
