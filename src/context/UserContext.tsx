import React, { createContext, useState, useContext, ReactNode } from 'react';
import IUser from '../types/IUser';
import firestore from '@react-native-firebase/firestore';

// Define interface for the data fetched from the Pokémon API

// Define context type
interface UserContextType {
  userId: string | null;
  currentUser: IUser | null;
  loading: boolean;
  error: Error | null | string;
  favourites: any | null;
  setFavourites: (data: any) => void;
  fetchCurrentUser: (userId: string) => void;
  setUserId: (userId: string) => void;
}

// Create context
const UserContext = createContext<UserContextType>({
  userId: null,
  currentUser: null,
  loading: false,
  error: null,
  favourites: null,
  setFavourites: (data: any) => {},
  fetchCurrentUser: (userId: string) => {},
  setUserId: (userId: string) => {},
});

// Custom hook for accessing Pokémon context
export const useUser = () => useContext(UserContext);

// Pokémon provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null | string>(null);

  const [favourites, setFavourites] = useState<any>([]);

  const fetchCurrentUser = async (userId: string) => {
    setLoading(true);
    try {
      const userDoc = await firestore().collection('users').doc(userId).get();
      if (!userDoc.exists) {
        throw new Error('User does not exist');
      }
      setCurrentUser(userDoc.data()?.user as IUser);
    } catch (err) {
      const error = err as Error;
      console.error('Error fetching user data:', error);
      setError(error.message || 'An error occurred');

      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        loading,
        error,
        fetchCurrentUser,
        userId,
        setUserId,
        favourites,
        setFavourites,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
