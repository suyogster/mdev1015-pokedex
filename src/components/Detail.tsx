/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ApiPokemonDetail } from '../types/IPokemon';


/*This component is to be used for the details screen of each pokemon for describing its abilities and strengths */

const descriptionKeys = [
    'Species',
    'Height',
    'Weight',
    'Abilities',
    'Weakness',
    'Genders',
];

interface DetailProps {
    species: {
        name: string;
        url: string;
    };
    height: number;
    weight: number;
    abilities: {
        ability: {
            name: string;
            url: string;
        },
        isHidden: boolean;
    }[];
    stats: {
        base_stat: number;
        effort: number;
    }[];
}

function renderDescription(item: string, props: DetailProps) {
    if (item === 'Abilities') {
        const abilitiesCollection = props.abilities.map((each) => each.ability.name);
        return (
            <Text>{abilitiesCollection.join(', ')}</Text>
        );
    } else if (item === 'Weakness') {
        const weaknessData = props.stats.map((each) => each.effort);
        return (
            <View style={styles.typeSection}>
                <View
                    style={[
                        styles.typeContainer,
                        { backgroundColor: '#FFFFFF', opacity: 0.5 },
                    ]}
                >
                    <Text> {weaknessData.join(', ')} </Text>
                </View>
            </View>
        );
        //} else if (item === 'Genders') {
        //    return (
        //        <View style={{ flexDirection: 'row' }}>
        //            <View style={{ flexDirection: 'row' }}>
        //                <Image source={require('../../assets/male_icon.png')} />
        //                <Text> {props.genderRatio.male} </Text>
        //            </View>
        //            <View style={{ flexDirection: 'row' }}>
        //                <Image source={require('../../assets/female_icon.png')} />
        //                <Text> {props.genderRatio.female} </Text>
        //            </View>
        //        </View>
        //    );
    } else if (item === 'Species') {
        return <Text> {props?.species?.name} </Text>;
    } else if (item === 'Height') {
        return <Text> {props?.height} </Text>;
    } else if (item === 'Weight') {
        return <Text> {props?.weight} </Text>;
    }
}

export default function Detail(props: DetailProps) {
    return (
        <View style={styles.container}>
            {descriptionKeys.map((item, index) => (
                <View key={index} style={styles.decriptionSection}>
                    <Text style={styles.keyText}>{descriptionKeys[index]}</Text>
                    <View
                        style={{
                            flex: 1,
                            marginLeft: '20%',
                            justifyContent: 'flex-end',
                            alignContent: 'flex-end',
                            alignItems: 'flex-end',
                        }}
                    >
                        {renderDescription(item, props)}
                    </View>
                </View>
            ))}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    decriptionSection: {
        flexDirection: 'row',
        width: '70%',
        marginVertical: 10,
        marginHorizontal: 10,
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
    },
    keyText: {
        color: '#6F7A87',
        fontWeight: '500',
        fontSize: 16,
        marginRight: 20,
    },
    valueText: {
        color: '#6F7A87',
        fontWeight: '300',
        fontSize: 16,
    },
    typeSection: {
        flexDirection: 'row',
    },
    typeContainer: {
        borderRadius: 20,
        padding: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
});
