import {useEffect, useRef, useState} from 'react';
import {pokeApi} from '../api';
import {ListedPokemon, PokemonPaginated, BasicPokemon} from '../interfaces';

export const useGetListedPokemons = () => {
  const [basicPokemonsList, setBasicPokemonsList] = useState<BasicPokemon[]>(
    [],
  );
  const pokemonPageUrl = useRef(
    'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0',
  );

  const fetchListedPokemons = async () => {
    const response = await pokeApi.get<PokemonPaginated>(
      pokemonPageUrl.current,
    );
    pokemonPageUrl.current = response.data.next;

    createBasicPokemons(response.data.results);
  };

  const createBasicPokemons = (listedPokemons: ListedPokemon[]) => {
    const basicPokemons = listedPokemons.map(pokemon => {
      const splitedUrl = pokemon.url.split('/');
      const id = splitedUrl[splitedUrl.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return {id, name: pokemon.name, picture};
    });

    setBasicPokemonsList([...basicPokemonsList, ...basicPokemons]);
  };

  useEffect(() => {
    fetchListedPokemons();
  }, []);

  return {basicPokemonsList, fetchListedPokemons};
};
