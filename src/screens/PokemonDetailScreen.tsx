/* eslint-disable react-native/no-inline-styles */
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import IPokemon from '../types/IPokemon';
import Detail from '../components/Detail';
import DetailStats from '../components/DetailStats';
import { ApiPokemonDetail } from '../types/IPokemon';

interface PokemonType {
    type: {
        name: string;
        url: string;
    }
}

const cardColors = {
    primaryColor: '#FCC800',
    secondaryColor: '#6890F0',
}

export default function PokemonDetailScreen(props: any) {
    const { data, index } = props.route.params;

    const defaultImage = require('../../assets/Logo_Pokedex.png');

    if (!data) {
        return (
            <View style={styles.noDataContainer}>
                <Image
                    style={{
                        width: 71,
                        height: 71,
                        alignSelf: 'center',
                        marginLeft: 10,
                    }}
                    source={defaultImage}
                />
                <Text>
                    Sorry, couldn't fetch data as of now !
                </Text>
            </View>
        );
    }

    const name = data.name ?? null;
    const types = data.types ?? null;
    const stats = data.stats ?? null;
    const species = data.species ?? null;
    const height = data.height ?? 0;
    const weight = data.weight ?? 0;
    const abilities = data.abilities ?? 0;
    const base_experience = data.base_experience ?? 0;
    const order = data.order ?? 0;

    const [page, setPage] = useState<number>(0);
    const [selected, setSelected] = useState<boolean>(false);

    const assignColor = (id: number) => {
        if (id > 10) {
            return cardColors.secondaryColor;
        }
        return cardColors.primaryColor;
    };

    return (
        <SafeAreaView style={styles.container}>
            <SafeAreaView
                style={[styles.firstSection, { backgroundColor: assignColor(index) }]}
            >
                <View style={styles.customHeader}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <Image source={require('../../assets/Back_Arrow.png')} />
                    </TouchableOpacity>

                    <View style={styles.customHeaderRightIcons}>
                        <TouchableOpacity onPress={() => setSelected(!selected)}>
                            <Image
                                style={selected ? { tintColor: 'red' } : { tintColor: 'white' }}
                                source={require('../../assets/FavoriteIcon.png')}
                            />
                        </TouchableOpacity>
                        <Text style={styles.indexText}>{`##${index}`}</Text>
                    </View>
                </View>

                <View style={styles.multimediaSection}>
                    <Image source={defaultImage} style={{ height: 250, width: 250 }} />
                    <Text style={styles.nameText}>{name ?? "--"}</Text>
                    <View style={styles.typeSection}>
                        <TouchableOpacity disabled={page === 0} onPress={() => setPage(0)}>
                            <Image source={require('../../assets/Left_Icon.png')} />
                        </TouchableOpacity>

                        <View style={styles.typeSection}>
                            {types ? (types.map((item: PokemonType, index: number) => (
                                <View
                                    key={`#${index.toString()}`}
                                    style={[
                                        styles.typeContainer,
                                        { backgroundColor: '#FFFFFF', opacity: 0.5 },
                                    ]}
                                >
                                    <Text> {item?.type?.name} </Text>
                                </View>
                            ))) : "NO TYPES"}
                        </View>

                        <TouchableOpacity disabled={page === 1} onPress={() => setPage(1)}>
                            <Image source={require('../../assets/Right_Icon.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>

            <View style={styles.statsSection}>
                <View style={styles.statsHeader}>
                    <View>
                        <Text style={styles.statsHeaderText}>Info</Text>
                        {page === 0 && (
                            <View
                                style={{
                                    borderColor: assignColor(index),
                                    borderWidth: 2,
                                    width: '120%',
                                }}
                            />
                        )}
                    </View>
                    <View>
                        <Text style={styles.statsHeaderText}>Stats</Text>
                        {page === 1 && (
                            <View
                                style={{
                                    borderColor: assignColor(index),
                                    borderWidth: 2,
                                    width: '120%',
                                }}
                            />
                        )}
                    </View>
                </View>

                <View style={styles.statsContentSection}>
                    {page === 0 ? (
                        <Detail
                            species={species}
                            height={height}
                            weight={weight}
                            stats={stats}
                            abilities={abilities}
                        //genderRatio={genderRatio}
                        />
                    ) : (
                        <DetailStats
                            attack={base_experience}
                            hp={height}
                            speed={order}
                        />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    firstSection: {
        flex: 0.6,
    },
    customHeader: {
        flex: 1 / 8,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignContent: 'center',
        paddingHorizontal: 20,
        //change for android layout
        paddingTop: Platform.OS == "ios" ? 0 : 30,
    },

    customHeaderRightIcons: {
        flexDirection: 'row',
        width: '25%',
        justifyContent: 'space-between',
        alignContent: 'center',
    },

    indexText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 19,
    },

    nameText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 24,
    },

    multimediaSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    multimediaLastRow: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'space-between',
    },

    typeSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'space-between',
    },

    typeContainer: {
        borderRadius: 20,
        padding: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        marginHorizontal: 5,
    },

    noDataContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    statsSection: {
        flex: 0.5,
        margin: 20,
        //Change for android
        maxHeight: Platform.OS == "ios" ? 0 : '40%',
    },

    statsHeader: {
        flex: 1 / 8,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '40%',
    },

    statsHeaderText: {
        fontSize: 16,
        color: '#888888',
        fontWeight: '500',
    },

    statsContentSection: {
        flex: 1,
        //Change for android
        paddingBottom: Platform.OS == "ios" ? 0 : 10,
    },

});
