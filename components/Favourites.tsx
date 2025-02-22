import React, { FC } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Weather } from '../types/api';

interface ForecastProps {
  favorites: Weather[];
}

const Favourites: FC<ForecastProps> = ({ favorites }) => {
  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.favoriteItem}>
          <Text>{item.name}</Text>
          <Text>{Math.round(item.main.temp)}°C</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  favoriteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    marginVertical: 5,
  },
});

export default Favourites;
