import * as React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

const Results = ({climate}) => {
  const {name, main, weather} = climate;
  const kelvin = 273.15;

  // eslint-disable-next-line radix
  const getClimateCenti = gKelvin => parseInt(gKelvin - kelvin);

  if (!name) {
    return null;
  }
  const {temp, temp_min, temp_max} = main;
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.current]}>
        {getClimateCenti(temp)}
        <Text style={styles.temp}>&#x2103;</Text>
        <Image
          source={{
            uri: `http://openweathermap.org/img/w/${weather[0].icon}.png`,
          }}
          style={{width: 66, height: 58}}
        />
      </Text>
      <View style={styles.containerTemps}>
        <Text style={styles.text}>
          Min{' '}
          <Text style={styles.temp}>{getClimateCenti(temp_min)} &#x2103;</Text>
        </Text>
        <Text style={styles.text}>
          Max{' '}
          <Text style={styles.temp}>{getClimateCenti(temp_max)} &#x2103;</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginRight: 20,
  },
  current: {
    fontSize: 80,
    marginRight: 0,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  containerTemps: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Results;
