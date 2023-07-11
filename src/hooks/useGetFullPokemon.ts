import {pokeApi} from '../api';
import {FullPokemonData} from '../interfaces';
import {useEffect, useState} from 'react';

export const useGetFullPokemon = (id: string) => {
  const [fullPokemon, setFullPokemon] = useState({} as FullPokemonData);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPokemonData = async (id: string) => {
    const response = await pokeApi.get<FullPokemonData>(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    );

    setFullPokemon(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPokemonData(id);
  }, []);

  return {fullPokemon, isLoading};
};
