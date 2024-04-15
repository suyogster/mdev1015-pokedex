import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';

// Define interface for the data fetched from the Pokémon API
interface Pokemon {
  name: string;
  url: string;
  // Add other properties as needed
}

// Define context type
interface PokemonContextType {
  pokemonList: Pokemon[] | null;
  loading: boolean;
  error: Error | string | null;
  fetchPokemonData: () => void;
}

// Create context with default values
const PokemonContext = createContext<PokemonContextType>({
  pokemonList: null,
  loading: false,
  error: null,
  fetchPokemonData: () => {},
});

// Custom hook for accessing Pokémon context
export const usePokemon = () => useContext(PokemonContext);

// Pokémon provider component
interface PokemonProviderProps {
  children: ReactNode; // Define children prop type as ReactNode for TypeScript
}

export const PokemonProvider: React.FC<PokemonProviderProps> = ({
  children,
}) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | string | null>(null);

  const fetchPokemonData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon');
      if (!response.ok) {
        throw new Error('Failed to fetch Pokémon data');
      }
      const json = await response.json();
      setPokemonList(json.results);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error('An unexpected error occurred');
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Pokémon data on component mount
  useEffect(() => {
    fetchPokemonData();
  }, []);

  return (
    <PokemonContext.Provider
      value={{ pokemonList, loading, error, fetchPokemonData }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
