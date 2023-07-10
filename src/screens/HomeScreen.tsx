import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PokemonCard} from '../components';
import {useGetListedPokemons} from '../hooks';

const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {basicPokemonsList, fetchListedPokemons} = useGetListedPokemons();

  return (
    <>
      <Image
        source={require('../assets/pokebola-blanca.png')}
        style={styles.image}
      />
      <View style={{top}}>
        <Text style={styles.title}>Pokedex</Text>
        {basicPokemonsList.length === 0 ? (
          <ActivityIndicator />
        ) : (
          <View style={{alignItems: 'center'}}>
            <FlatList
              data={basicPokemonsList}
              keyExtractor={pokemon => pokemon.id}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              // Items
              renderItem={({item}) => <PokemonCard pokemon={item} />}
              // InfiniteScroll
              onEndReachedThreshold={0.4}
              onEndReached={fetchListedPokemons}
              // Loader
              ListFooterComponent={
                <ActivityIndicator
                  size={3}
                  color="white"
                  style={{marginVertical: 15}}
                />
              }
            />
          </View>
        )}
      </View>
    </>
  );
};

export default HomeScreen;

export const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    width: 400,
    height: 400,
    opacity: 0.2,
    top: -80,
    right: -100,
  },
  title: {
    color: 'white',
    fontSize: 40,
    marginLeft: 15,
    marginBottom: 5,
  },
});
