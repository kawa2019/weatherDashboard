jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
  useFonts: () => [true],
  isLoaded: jest.fn(() => true),
  loadedNativeFonts: [], // Zamockowana wartość jako pusta tablica
}));
