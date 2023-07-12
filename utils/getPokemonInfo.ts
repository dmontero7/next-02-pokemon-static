import { pokeApi } from "@/api";
import { PokemonData } from '../interfaces/pokemon';

export const getPokemonInfo = async (nameOrId: string) => {
try{
    const { data } = await pokeApi.get<PokemonData>(`/pokemon/${nameOrId}`);
    const pokemon = {
        id: data.id,
        name: data.name,
        sprites: data.sprites
    }
    return pokemon;
}catch(error){
    return null;
}
}
