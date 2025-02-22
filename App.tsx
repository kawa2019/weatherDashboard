import { API_KEY } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import Favourites from '@/components/Favourites';
import Forecast from '@/components/Forecast';
import RetryErrorMessage from '@/components/RetryErrorMessage';
import Search from '@/components/Search';
import WeatherBackground from '@/components/WeatherBackground';
import WeatherWidget from '@/components/WeatherWidget';

import { GEO_API_URL } from './constants/api';
import { CitySuggestions, ForecastT, Weather } from './types/api';
import { FavoriteCity } from './types/favorites';

const { width } = Dimensions.get('window');

const App = () => {
  const [weatherData, setWeatherData] = useState<Weather>(null);
  const [forecastData, setForecastData] = useState<ForecastT>([]);
  const [city, setCity] = useState<string>('');
  const [suggestions, setSuggestions] = useState<CitySuggestions>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean | null>(null);
  const [favoriteCities, setFavoriteCities] = useState<FavoriteCity[]>([]);
  const [weatherDataFavorities, setWeatherDataFavorities] = useState<Weather[]>(
    [],
  );

  const loadInitialWeatherData = async () => {
    setLoading(true);
    setError(false);
    try {
      let loc = await Location.getCurrentPositionAsync({});
      await fetchWeather(loc.coords.latitude, loc.coords.longitude);
      await fetchForecast(loc.coords.latitude, loc.coords.longitude);
    } catch (e) {
      setError(true);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Allow location access to use this feature',
        );
        setLoading(false);
      } else {
        await loadInitialWeatherData();
      }

      await loadFavoriteCities();
    })();
  }, []);

  const handleSearch = (text: string) => {
    setCity(text);
    fetchCitySuggestions(text);
  };

  const fetchWeather = async (lat: number, lon: number, isMultiple = false) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    );
    if (isMultiple) {
      return response.data;
    } else {
      setWeatherData(response.data);
    }
  };

  const fetchForecast = async (lat, lon) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    );
    const dailyData = response.data.list.filter((reading) =>
      reading.dt_txt.includes('12:00:00'),
    );
    setForecastData(dailyData);
  };

  const fetchCitySuggestions = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        `${GEO_API_URL}?q=${query}&limit=5&appid=${API_KEY}`,
      );
      setSuggestions(response.data);
    } catch {
      Alert.alert(
        'Error',
        'Unable to fetch city suggestions. Please try again later.',
      );
    }
  };

  const handleCitySelect = async (city) => {
    setCity(city.name);
    setSuggestions([]);

    try {
      await fetchWeather(city.lat, city.lon);
      await fetchForecast(city.lat, city.lon);
    } catch {
      Alert.alert(
        'Error',
        'Unable to fetch weather data. Please try again later.',
      );
    }
  };

  const loadFavoriteCities = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favoriteCities');
      const parsedFavorites = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];
      setFavoriteCities(parsedFavorites);
      fetchWeatherForFavorites(parsedFavorites);
    } catch {
      Alert.alert('Error', 'Failed to load favorite cities.');
    }
  };

  const fetchWeatherForFavorites = async (cities: FavoriteCity[]) => {
    try {
      const weatherResults = await Promise.all(
        cities.map(async (city) => {
          return await fetchWeather(city.lat, city.lon, true);
        }),
      );

      setWeatherDataFavorities(weatherResults);
    } catch {
      Alert.alert('Error', 'Failed to fetch weather data of favorite cities.');
    }
  };

  const addFavorite = async (data: Weather) => {
    try {
      const city = {
        id: data.id,
        lat: data.coord.lat,
        lon: data.coord.lon,
      };
      const updatedFavorites = [...favoriteCities, city];
      setFavoriteCities(updatedFavorites);
      await AsyncStorage.setItem(
        'favoriteCities',
        JSON.stringify(updatedFavorites),
      );

      const weather = await fetchWeather(city.lat, city.lon, true);
      if (weather) {
        setWeatherDataFavorities((prev) => [...prev, weather]);
      }
    } catch {
      Alert.alert('Error', 'Failed to add city to favorites.');
    }
  };

  const removeFavorite = async (cityId: number) => {
    try {
      const updatedFavorites = favoriteCities.filter(
        (city) => city.id !== cityId,
      );
      setFavoriteCities(updatedFavorites);
      await AsyncStorage.setItem(
        'favoriteCities',
        JSON.stringify(updatedFavorites),
      );

      const updatedWeatherData = weatherDataFavorities.filter(
        (city) => city.id !== cityId,
      );
      setWeatherDataFavorities(updatedWeatherData);
    } catch {
      Alert.alert('Error', 'Failed to remove city from favorites.');
    }
  };

  const toggleFavorite = (data: Weather) => {
    const isFavorite = favoriteCities.some((fav) => fav.id === weatherData.id);
    isFavorite ? removeFavorite(data.id) : addFavorite(data);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    );
  }

  if (error) {
    return <RetryErrorMessage onRetry={loadInitialWeatherData} />;
  }

  const gradientType = weatherData ? weatherData.weather[0].main : 'default';

  return (
    <SafeAreaView style={styles.safeArea}>
      <WeatherBackground gradientType={gradientType}>
        <View style={styles.container}>
          <Search
            handleSearch={handleSearch}
            city={city}
            suggestions={suggestions}
            handleCitySelect={handleCitySelect}
          />

          {weatherData && (
            <WeatherWidget
              weatherData={weatherData}
              favoriteCities={favoriteCities}
              toggleFavorite={toggleFavorite}
            />
          )}

          {forecastData && <Forecast forecastData={forecastData} />}
          <Favourites favorites={weatherDataFavorities} />
        </View>
      </WeatherBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    padding: width > 768 ? 40 : 20,
    justifyContent: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
