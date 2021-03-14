import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableNativeFeedback,
  Animated,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Forms = ({search, setSearch, setIsValidForm, disabled, setDisabled}) => {
  const [animationButton] = React.useState(new Animated.Value(1));

  const animationIn = () => {
    Animated.spring(animationButton, {
      toValue: 0.7,
      useNativeDriver: true,
    }).start();
  };
  const animationOut = () => {
    Animated.spring(animationButton, {
      toValue: 1,
      useNativeDriver: true,
      friction: 1,
      tension: 30,
    }).start();
  };

  const styleAnimation = {
    transform: [
      {
        scale: animationButton,
      },
    ],
  };

  const showAlert = ({status = 'Error', msg}) => {
    return Alert.alert(status, msg);
  };

  const handleSubmit = () => {
    console.log('si');
    setDisabled(true);
    if (search.city.trim() === '') {
      setDisabled(false);
      return showAlert({msg: 'Ciudad requerida'});
    }
    if (search.country.trim() === '') {
      setDisabled(false);
      return showAlert({msg: 'Pais requerido'});
    }
    setIsValidForm(true);
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          value={search.city}
          onChangeText={e => setSearch(prev => ({...prev, city: e}))}
          placeholder="Ciudad"
          placeholderTextColor="#666"
          style={styles.textInput}
        />
      </View>
      <View>
        <Picker
          selectedValue={search.country}
          onValueChange={country => setSearch(prev => ({...prev, country}))}
          style={{height: 50, backgroundColor: '#fff', color: '#000'}}
          mode="dropdown">
          <Picker.Item label="-- Selecione un país --" value="" />
          <Picker.Item label="Venezuela" value="VE" />
          <Picker.Item label="EEUU" value="US" />
          <Picker.Item label="Mexico" value="MX" />
          <Picker.Item label="Argenrtina" value="AR" />
          <Picker.Item label="Colombia" value="CO" />
          <Picker.Item label="Costa Rica" value="CR" />
          <Picker.Item label="España" value="ES" />
          <Picker.Item label="Peru" value="PE" />
        </Picker>
      </View>

      <TouchableNativeFeedback
        onPress={() => !disabled && handleSubmit()}
        onPressIn={animationIn}
        onPressOut={animationOut}>
        <Animated.View style={[styles.btnSearch, styleAnimation]}>
          <Text style={styles.btnSearchText}>Buscar Clima</Text>
        </Animated.View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  textInput: {
    backgroundColor: '#fff',
    color: '#000',
    padding: 10,
    height: 50,
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  btnSearch: {
    marginTop: 50,
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center',
  },
  btnSearchText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Forms;
