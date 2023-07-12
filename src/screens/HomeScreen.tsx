import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {PokemonCard} from '../components';
import {useGetListedPokemons} from '../hooks';
import {RootStackParams} from '../navigator/StackNavigator';

const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const {basicPokemonsList, fetchListedPokemons} = useGetListedPokemons();

  return (
    <>
      <Image
        source={require('../assets/pokebola-blanca.png')}
        style={styles.image}
      />
      <View style={{top}}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Pokedex</Text>
          <Pressable onPress={() => navigation.navigate('SearchScreen')}>
            <Icon name="search-outline" size={40} color="white" />
          </Pressable>
        </View>
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
    marginBottom: 5,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 35,
  },
});
