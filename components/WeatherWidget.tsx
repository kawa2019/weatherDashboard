import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { weatherIcons } from '@/constants/weatherIcons';
import React, { FC } from 'react';
import { Weather } from '../types/api';
import { FavoriteCity } from '../types/favorites';
import UIButton from '@/components/ui/UiButton';

interface WeatherWidgetProps {
  weatherData: Weather;
  favoriteCities: FavoriteCity[];
  toggleFavorite: (weather: Weather) => void;
}

const { width } = Dimensions.get('window');

const WeatherWidget: FC<WeatherWidgetProps> = ({
  weatherData,
  favoriteCities,
  toggleFavorite,
}) => {
  const isFavorite = favoriteCities.some((fav) => fav.id === weatherData.id);
  return (
    <View style={styles.weatherContainer}>
      <Text style={styles.cityName}>{weatherData.name}</Text>
      <MaterialCommunityIcons
        name={weatherIcons[weatherData.weather[0].main] || 'weather-cloudy'}
        size={72}
        color='white'
      />
      <Text style={styles.temperature}>
        {Math.round(weatherData.main.temp)}°C
      </Text>
      <Text style={styles.weatherCondition}>{weatherData.weather[0].main}</Text>
      <UIButton
        onPress={() => toggleFavorite(weatherData)}
        iconName={isFavorite ? 'heart' : 'heart-outline'}
        iconColor={isFavorite ? 'red' : 'gray'}
        isIconOnly={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cityName: {
    fontSize: width > 768 ? 48 : 32,
    fontWeight: 'bold',
    color: 'white',
  },
  temperature: {
    fontSize: width > 768 ? 64 : 48,
    color: 'white',
  },
  weatherCondition: {
    fontSize: width > 768 ? 32 : 24,
    color: 'white',
  },
});

export default WeatherWidget;
