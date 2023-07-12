import React from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {FadeInImage} from '../components';
import {RootStackParams} from '../navigator/StackNavigator';
import {useGetFullPokemon} from '../hooks';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

const PokemonScreen = ({route, navigation}: Props) => {
  const {basicPokemon, color} = route.params;
  const {isLoading, fullPokemon} = useGetFullPokemon(basicPokemon.id);

  return (
    <View>
      <View style={{...styles.pokemonImgContainer, backgroundColor: color}}>
        <Pressable onPress={() => navigation.goBack()} style={styles.arrow}>
          <Icon
            name="arrow-back-outline"
            style={styles.arrow}
            size={40}
            color="white"
          />
        </Pressable>
        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokeballImg}
        />
        <FadeInImage uri={basicPokemon.picture} style={styles.Img} />
      </View>

      <Text style={styles.title}>
        {`${basicPokemon.name
          .slice(0, 1)
          .toUpperCase()}${basicPokemon.name.slice(1)} #${basicPokemon.id}`}
      </Text>

      <ScrollView style={styles.dataContainer}>
        {isLoading ? (
          <ActivityIndicator
            color="white"
            size={100}
            style={{alignSelf: 'center', marginTop: 20}}
          />
        ) : (
          <>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.spriteContainer}>
              <FadeInImage
                uri={fullPokemon.sprites.front_default}
                style={styles.sprite}
              />
              <FadeInImage
                uri={fullPokemon.sprites.back_default}
                style={styles.sprite}
              />
              <FadeInImage
                uri={fullPokemon.sprites.front_shiny}
                style={styles.sprite}
              />
              <FadeInImage
                uri={fullPokemon.sprites.back_shiny}
                style={styles.sprite}
              />
            </ScrollView>
            <View style={styles.basicInfo}>
              <View>
                <Text style={styles.subtitle}>Types</Text>
                {fullPokemon.types.map(item => (
                  <Text key={item.type.name} style={{...styles.text}}>
                    ・{item.type.name}
                  </Text>
                ))}
              </View>
              <View>
                <Text style={styles.subtitle}>Base Habilities</Text>
                {fullPokemon.abilities.map(item => (
                  <Text key={item.ability.name} style={{...styles.text}}>
                    ・{item.ability.name}
                  </Text>
                ))}
              </View>
            </View>
            <Text style={styles.subtitle}>Stats</Text>
            <View style={styles.stats}>
              <View>
                <Text style={styles.text}>
                  ・height:{' '}
                  <Text style={styles.statValue}>{fullPokemon.height}</Text>
                </Text>
                {fullPokemon.stats.slice(0, 3).map(item => (
                  <Text key={item.stat.name} style={styles.text}>
                    ・{item.stat.name}:{' '}
                    <Text
                      key={item.base_stat + item.stat.name}
                      style={styles.statValue}>
                      {' '}
                      {item.base_stat}{' '}
                    </Text>
                  </Text>
                ))}
              </View>
              <View>
                <Text style={{...styles.text}}>
                  ・weight:{' '}
                  <Text style={styles.statValue}>{fullPokemon.weight}</Text>
                </Text>
                {fullPokemon.stats.slice(3, 6).map(item => (
                  <Text key={item.stat.name} style={styles.text}>
                    ・{item.stat.name}:{' '}
                    <Text
                      key={item.base_stat + item.stat.name}
                      style={styles.statValue}>
                      {' '}
                      {item.base_stat}{' '}
                    </Text>
                  </Text>
                ))}
              </View>
            </View>
            <Text style={{...styles.subtitle, marginTop: 10}}>Moves</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                paddingBottom: 50,
              }}>
              {fullPokemon.moves.map(item => (
                <Text key={item.move.name} style={styles.text}>
                  ・{item.move.name}
                </Text>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default PokemonScreen;

export const styles = StyleSheet.create({
  pokemonImgContainer: {
    display: 'flex',
    width: '100%',
    height: '13%',
    alignItems: 'center',
    alignContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  Img: {
    position: 'absolute',
    width: 250,
    height: 250,
    top: 20,
  },
  pokeballImg: {
    position: 'absolute',
    bottom: -15,
    width: 300,
    height: 300,
    opacity: 0.3,
  },
  title: {
    color: 'white',
    fontSize: 50,
    marginTop: 20,
  },
  subtitle: {
    color: 'white',
    fontSize: 30,
    marginBottom: 5,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  arrow: {
    position: 'absolute',
    left: 6,
    top: 20,
  },
  dataContainer: {
    display: 'flex',
    width: '100%',
    height: '80%',
    paddingHorizontal: 10,
    marginBottom: 1000,
  },
  spriteContainer: {
    width: '100%',
    height: 100,
    padding: 0,
  },
  sprite: {
    width: 100,
    height: 100,
  },
  basicInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  stats: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsItems: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  statValue: {
    fontWeight: 'bold',
  },
});
