import {createStackNavigator} from '@react-navigation/stack';
import {BasicPokemon} from '../interfaces';
import {HomeScreen, PokemonScreen, SearchScreen} from '../screens';

export type RootStackParams = {
  HomeScreen: undefined;
  PokemonScreen: {basicPokemon: BasicPokemon; color: string};
  SearchScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#2F2D2E',
        },
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
