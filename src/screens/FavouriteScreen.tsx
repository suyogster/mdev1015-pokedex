import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { favoriteData } from '../data/mockedPokemon';

import FavoriteCard from '../components/FavouriteCard';
import { useUser } from '../context/UserContext';

export default function FavouriteScreen(props: any) {
  const { favourites } = useUser();
  return (
    <SafeAreaView>
      <FlatList
        data={favourites}
        renderItem={(items) => (
          <FavoriteCard
            id={`#00${items.index}`}
            data={items.item}
            navigation={props.navigation}
          />
        )}
        keyExtractor={(item) => item.name}
      />
    </SafeAreaView>
  );
}
