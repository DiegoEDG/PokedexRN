import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useFullListedPokemons, useGetListedPokemons} from '../hooks';
import {InputSearch, PokemonCard} from '../components';
import {BasicPokemon} from '../interfaces';

const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  const {basicPokemonsList} = useFullListedPokemons();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState<BasicPokemon[]>([]);

  useEffect(() => {
    if (searchTerm.length === 0) {
      return setSearchResult([]);
    }
    if (isNaN(Number(searchTerm))) {
      setSearchResult(
        basicPokemonsList.filter(pokemon =>
          pokemon.name
            .toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase()),
        ),
      );
    } else {
      setSearchResult(
        basicPokemonsList.filter(pokemon => pokemon.id === searchTerm),
      );
    }
  }, [searchTerm]);

  return (
    <View style={{...styles.container, top}}>
      <Image
        source={require('../assets/pokebola-blanca.png')}
        style={styles.image}
      />

      <InputSearch onDebounce={value => setSearchTerm(value)} />
      <Text style={styles.searchTerm}>
        {searchTerm.length === 0 ? ' ' : `"${searchTerm}"`}
      </Text>

      <View style={styles.resultsContainer}>
        <FlatList
          data={searchResult}
          keyExtractor={pokemon => pokemon.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          // Items
          renderItem={({item}) => <PokemonCard pokemon={item} />}
        />
      </View>
    </View>
  );
};

export default SearchScreen;

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  image: {
    position: 'absolute',
    top: 200,
    width: 400,
    height: 400,
    opacity: 0.2,
  },
  searchTerm: {
    color: 'white',
    fontSize: 34,
    marginLeft: 25,
    marginTop: 10,
  },
  resultsContainer: {
    flex: 1,
    alignItems: 'center',

    paddingVertical: 5,
  },
});
