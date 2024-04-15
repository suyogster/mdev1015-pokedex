/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors } from '../theme/theme';
import { ApiPokemonDetail } from '../types/IPokemon';
import axios from 'axios';

/*This is a component to display the pokemon in a form of Card component in the main screen */

interface PokemonCollection {
  name: string;
  url: string;
}

const cardColors = {
  primaryColor: '#FCC800',
  secondaryColor: '#6890F0',
};

interface PokemonCardProps {
  id: number;
  data: PokemonCollection;
  navigation: any;
}

export default function PokemonCard(props: PokemonCardProps) {
  const { id, data, navigation } = props;

  const { name, url } = data;

  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const fetchImageUrl = async () => {
      // Ensure `data.url` or a similar prop is passed to `YourComponent` and contains the API URL
      if (!data.url) return; // Check if the URL exists

      try {
        const response = await axios.get(url);
        setImageUrl(response.data.sprites.front_default);
      } catch (error) {
        console.error('Failed to fetch image URL:', error);
        // Handle error, e.g., set a default image URL or update state to indicate an error
      }
    };

    fetchImageUrl();
  }, [data.url]);

  const [pokemonDetail, setPokemonDetail] = useState<ApiPokemonDetail | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null | string>(null);

  const defaultImage = require('../../assets/Logo_Pokedex.png');

  const assignColor = (id: number) => {
    if (id > 10) {
      return cardColors.secondaryColor;
    }
    return cardColors.primaryColor;
  };

  const fetchPokemonDetail = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch Pokémon DETAIL !!');
      }
      const json = await response.json();

      setPokemonDetail(json);
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
    fetchPokemonDetail();
  }, [pokemonDetail]);

  return (
    <TouchableOpacity
      key={data.name}
      style={[styles.container, { backgroundColor: assignColor(id) }]}
      onPress={() =>
        navigation.navigate('Detail', { data: pokemonDetail, index: id })
      }
    >
      <View key={data.name} style={styles.row}>
        <Text style={[styles.firstRowText, { alignSelf: 'flex-start' }]}>
          {name}
        </Text>
        <Text style={[styles.firstRowText, { alignSelf: 'flex-end' }]}>
          {`#0${id}`}
        </Text>
      </View>

      <View style={{ marginVertical: 2 }}></View>
      <View style={styles.row}>
        <View
          key={name}
          style={{
            alignSelf: 'flex-start',
            justifyContent: 'flex-start',
            width: '50%',
          }}
        >
          {pokemonDetail?.types.map((item, index) => (
            <View
              key={index}
              id={index.toString()}
              style={[
                styles.typeSection,
                { backgroundColor: '#FFFFFF', opacity: 0.5 },
              ]}
            >
              <Text> {item?.type?.name} </Text>
            </View>
          ))}
        </View>
        <Image
          style={{
            width: 71,
            height: 71,
            alignSelf: 'flex-end',
            marginLeft: 10,
          }}
          source={{
            uri: imageUrl,
          }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 5,
    padding: 20,
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    justifyContent: 'space-around',
  },

  row: {
    flexDirection: 'row',
    alignContent: 'space-around',
    justifyContent: 'space-between',
  },

  typeSection: {
    borderRadius: 20,
    marginVertical: 10,
    padding: 1,
  },
  firstRowText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Helvetica',
  },
});
