/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import {API_KEY} from '../env';

import Forms from './components/Forms';
import Results from './components/Results';

const App = () => {
  const [search, setSearch] = React.useState({
    city: '',
    country: '',
  });
  const [isValidForm, setIsValidForm] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [climate, setClimate] = React.useState({});
  const [backColor, setBackColor] = React.useState('rgb(71, 149, 212)');

  React.useEffect(() => {
    if (isValidForm) {
      const getClimate = async () => {
        try {
          const {city, country} = search;
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()},${country.trim()}&appid=${API_KEY}`;
          const response = await fetch(url);
          const {cod, message, ...data} = await response.json();
          // eslint-disable-next-line radix
          if (parseInt(cod) >= 400) {
            throw message;
          }
          if (data?.main?.temp) {
            const {
              main: {temp},
            } = data;
            const current = temp - 273.15;
            if (current < 10) {
              setBackColor('rgb(105, 108, 149)');
            } else if (current >= 10 && current < 25) {
              setBackColor('rgb(71, 149, 212)');
            } else {
              setBackColor('rgb(178, 28, 61)');
            }
          }
          setClimate(data);
        } catch (error) {
          Alert.alert('Error', error);
        }
        setIsValidForm(false);
        setDisabled(false);
      };

      getClimate();
    }
  }, [isValidForm, search]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: backColor}}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.content}>
              <Results climate={climate} />
              <Forms
                search={search}
                disabled={disabled}
                setSearch={setSearch}
                setIsValidForm={setIsValidForm}
                setDisabled={setDisabled}
              />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    marginHorizontal: '2.5%',
  },
});

export default App;
