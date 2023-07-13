import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStackParams} from '../navigator/StackNavigator';
import {useDebouncer} from '../hooks';

interface Props {
  onDebounce: (value: string) => void;
}

const InputSearch = ({onDebounce}: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const [textValue, setTextValue] = useState('');

  const deboncedValue = useDebouncer(textValue);

  useEffect(() => {
    onDebounce(deboncedValue);
  }, [deboncedValue]);

  return (
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
          value={textValue}
          onChangeText={setTextValue}
        />
        <Icon name="search-outline" size={30} color="white" />
      </View>
    </View>
  );
};

export default InputSearch;

export const styles = StyleSheet.create({
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
});
