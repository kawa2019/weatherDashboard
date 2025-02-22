// __tests__/WeatherWidget.test.tsx
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import WeatherWidget from '../components/WeatherWidget';

const mockWeatherData = {
  id: 1,
  name: 'Warsaw',
  weather: [{ main: 'Clear' }],
  main: { temp: 20 },
};

describe('WeatherWidget', () => {
  let favoriteCities: any[] = [];
  const mockToggleFavorite = jest.fn((weather) => {
    const index = favoriteCities.findIndex((city) => city.id === weather.id);
    if (index > -1) {
      favoriteCities.splice(index, 1);
    } else {
      favoriteCities.push(weather);
    }
  });

  beforeEach(() => {
    favoriteCities = [];
    mockToggleFavorite.mockClear();
  });

  describe('Rendering Weather Data', () => {
    it('displays the city name', () => {
      const { getByText } = render(
        <WeatherWidget
          weatherData={mockWeatherData}
          favoriteCities={[]}
          toggleFavorite={mockToggleFavorite}
        />,
      );

      expect(getByText('Warsaw')).toBeTruthy();
    });

    it('displays the temperature', () => {
      const { getByText } = render(
        <WeatherWidget
          weatherData={mockWeatherData}
          favoriteCities={[]}
          toggleFavorite={mockToggleFavorite}
        />,
      );

      expect(getByText('20°C')).toBeTruthy();
    });

    it('displays the weather condition', () => {
      const { getByText } = render(
        <WeatherWidget
          weatherData={mockWeatherData}
          favoriteCities={[]}
          toggleFavorite={mockToggleFavorite}
        />,
      );

      expect(getByText('Clear')).toBeTruthy();
    });
  });

  describe('Favorite Button Interactions', () => {
    it('adds the city to favorites when heart icon is pressed', () => {
      const { getByTestId } = render(
        <WeatherWidget
          weatherData={mockWeatherData}
          favoriteCities={[]}
          toggleFavorite={mockToggleFavorite}
        />,
      );

      const favoriteButton = getByTestId('favorite-icon');

      fireEvent.press(favoriteButton);

      expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
      expect(favoriteCities).toContainEqual(mockWeatherData);
    });

    it('removes the city from favorites when heart icon is pressed again', () => {
      favoriteCities.push(mockWeatherData);

      const { getByTestId, rerender } = render(
        <WeatherWidget
          weatherData={mockWeatherData}
          favoriteCities={favoriteCities}
          toggleFavorite={mockToggleFavorite}
        />,
      );

      const favoriteButton = getByTestId('favorite-icon');

      fireEvent.press(favoriteButton);

      expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
      expect(favoriteCities).not.toContainEqual(mockWeatherData);

      rerender(
        <WeatherWidget
          weatherData={mockWeatherData}
          favoriteCities={favoriteCities}
          toggleFavorite={mockToggleFavorite}
        />,
      );
    });
  });
});
