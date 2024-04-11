import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors } from '../theme/theme';
import SearchBar from '../components/SearchBar';
import PokemonCard from '../components/PokemonCard';
import { pokemonData } from '../data/mockedPokemon';
import { usePokemon } from '../context/PokemonContext';

/**
 * This screen contains Search Bar functionality that displays the Pokemon cards by number
 * It also navigates to PokemonDetailScreen
 */
export default function PokemonListScreen(props: any) {
    const [query, setQuery] = useState<string>('');

    const { pokemonList, loading, fetchPokemonData } = usePokemon();

    useEffect(() => {
        fetchPokemonData();
    }, []);

    if (loading) {
        return (
            <Text>
                NO DATA !
            </Text>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header Section with Search Bar */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.headerText}>Pokédex</Text>
                    <SearchBar onType={setQuery} />
                </View>
            </View>

            <View style={styles.listSection}>
                <FlatList
                    data={pokemonList}
                    renderItem={(items) => (
                        <PokemonCard
                            id={items.index}
                            data={items.item}
                            navigation={props.navigation}
                        />
                    )}
                    keyExtractor={(item) => item.name}
                    numColumns={2}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: colors.primary,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingVertical: 20,
    },
    headerContent: {
        paddingTop: 150,
        paddingHorizontal: 20,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 34,
        color: '#495767',
    },

    listSection: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
    },
});
