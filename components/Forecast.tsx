import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { FC } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { weatherIcons } from '@/constants/weatherIcons';

import { ForecastT } from '../types/api';

interface ForecastProps {
  forecastData: ForecastT;
}

const Forecast: FC<ForecastProps> = ({ forecastData }) => {
  return (
    <FlatList
      data={forecastData}
      keyExtractor={(item) => item.dt.toString()}
      horizontal
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={styles.forecastItem}>
          <Text>{new Date(item.dt_txt).toLocaleDateString()}</Text>
          <MaterialCommunityIcons
            name={weatherIcons[item.weather[0].main] || 'weather-cloudy'}
            size={36}
            color='white'
          />
          <Text>
            {Math.round(item.main.temp_min)}°C /{' '}
            {Math.round(item.main.temp_max)}°C
          </Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexGrow: 1,
  },
  forecastItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
});

export default Forecast;
