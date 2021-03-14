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
} from 'react-native';

import {API_KEY} from '../env';

import Forms from './components/Forms';

const App = () => {
  const [search, setSearch] = React.useState({
    city: '',
    country: '',
  });
  const [isValidForm, setIsValidForm] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  React.useEffect(() => {
    if (isValidForm) {
      const getClimate = async () => {
        const {city, country} = search;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setIsValidForm(false);
        setDisabled(false);
      };

      getClimate();
    }
  }, [isValidForm, search]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.content}>
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
    backgroundColor: 'rgb(71,149,212)',
    justifyContent: 'center',
  },
  content: {
    marginHorizontal: '2.5%',
  },
});

export default App;
