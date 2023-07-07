import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useGetListedPokemons} from '../hooks';

const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  useGetListedPokemons();

  return (
    <>
      <Image
        source={require('../assets/pokebola-blanca.png')}
        style={styles.image}
      />
      <View style={{top}}>
        <Text style={styles.title}>Pokedex</Text>
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
  },
});
