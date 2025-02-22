import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { FC } from 'react';
import { CitySuggestion } from '../types/api';

const { width } = Dimensions.get('window');

interface WeatherBackgroundProps {
  city: string;
  handleSearch: (text: string) => void;
  handleCitySelect: (city: CitySuggestion) => void;
  suggestions: CitySuggestion[];
}

const Search: FC<WeatherBackgroundProps> = ({
  city,
  handleSearch,
  handleCitySelect,
  suggestions,
}) => {
  return (
    <>
      <TextInput
        style={styles.searchInput}
        placeholder='Search City'
        value={city}
        onChangeText={handleSearch}
      />
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => handleCitySelect(item)}
            >
              <Text>
                {item.name}, {item.country}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: width > 768 ? 24 : 16,
  },
  suggestionItem: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default Search;
