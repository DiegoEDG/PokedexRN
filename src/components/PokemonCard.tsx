import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {BasicPokemon} from '../interfaces';
import {FadeInImage} from './FadeInImage';
import {useState, useEffect} from 'react';
import ImageColors from 'react-native-image-colors';

interface Props {
  pokemon: BasicPokemon;
}

const screenWidt = Dimensions.get('screen').width;

const PokemonCard = ({pokemon}: Props) => {
  const [cardBg, setCardBg] = useState('');

  useEffect(() => {
    ImageColors.getColors(pokemon.picture, {fallback: '#2E2F2D'}).then(
      colors => {
        if (colors.platform === 'ios') {
          setCardBg(colors.background);
        }
      },
    );
  }, []);

  return (
    <View style={{...styles.card, backgroundColor: cardBg}}>
      <Text style={styles.name}>{`${pokemon.name
        .slice(0, 1)
        .toUpperCase()}${pokemon.name.slice(1)}\n# ${pokemon.id}`}</Text>
      <Text style={styles.name}>{}</Text>
      <Image
        source={require('../assets/pokebola-blanca.png')}
        style={styles.pokeballImg}
      />
      <FadeInImage uri={pokemon.picture} style={styles.pokemonImg} />
    </View>
  );
};

export default PokemonCard;

export const styles = StyleSheet.create({
  card: {
    width: screenWidt * 0.4,
    height: 160,
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  name: {
    fontSize: 20,
    color: '#FFFFFF',
    padding: 10,
  },
  pokemonImg: {
    width: 130,
    height: 130,
    alignSelf: 'center',
    top: -32,
    left: 8,
  },
  pokeballImg: {
    position: 'absolute',
    bottom: -20,
    right: -20,
    width: 120,
    height: 120,
    opacity: 0.5,
  },
});
