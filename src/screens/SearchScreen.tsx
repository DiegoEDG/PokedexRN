import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStackParams} from '../navigator/StackNavigator';
import {useGetListedPokemons} from '../hooks';
import {PokemonCard} from '../components';

const SearchScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const {top} = useSafeAreaInsets();
  const {basicPokemonsList, fetchListedPokemons} = useGetListedPokemons();

  return (
    <View style={{...styles.container, top}}>
      <Image
        source={require('../assets/pokebola-blanca.png')}
        style={styles.image}
      />
      <View style={styles.headerContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={40} color="white" />
        </Pressable>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Search Pokemon"
            placeholderTextColor="gray"
            autoCapitalize="none"
            autoCorrect={false}
            style={{color: 'white', fontSize: 20}}
          />
          <Icon name="search-outline" size={30} color="white" />
        </View>
      </View>
      <Text style={styles.searchTerm}>"Cubone"</Text>
      <View style={styles.resultsContainer}>
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
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '88%',
    borderRadius: 15,

    borderColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
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
