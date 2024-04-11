export default interface IPokemon {
    name: string;
    type: string[];
    species: string;
    height: string;
    weight: string;
    abilities: string[];
    genderRatio: {
        male?: string;
        female?: string;
        genderless?: boolean;
    };
    baseStats: {
        hp: number;
        attack: number;
        defense: number;
        specialAttack: number;
        specialDefense: number;
        speed: number;
    };
    weaknesses: string[];
    primaryColor: string;
    image: any;
}

export interface ApiPokemonDetail {
    name: string;
    base_experience: number;
    types: {
        type: {
            name: string;
            url: string;
        }
    }[];
    height: number;
    weight: number;
    order: number;
    species: {
        name: string;
        url: string;
    };
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
    sprites: {
        back_default: string;
    }
}