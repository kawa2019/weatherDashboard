import { LinearGradient } from 'expo-linear-gradient';
import { FC, ReactNode } from 'react';
import { StyleSheet } from 'react-native';

const weatherGradients: { [key: string]: string[] } = {
  Clear: ['#f6d365', '#fda085'],
  Clouds: ['#d7d2cc', '#304352'],
  Rain: ['#4e54c8', '#8f94fb'],
  Thunderstorm: ['#141E30', '#243B55'],
  Snow: ['#83a4d4', '#b6fbff'],
  Drizzle: ['#89f7fe', '#66a6ff'],
  Mist: ['#3E5151', '#DECBA4'],
  Default: ['#bdc3c7', '#2c3e50'],
};

interface WeatherBackgroundProps {
  children: ReactNode;
  gradientType: string;
}

const WeatherBackground: FC<WeatherBackgroundProps> = ({
  children,
  gradientType,
}) => {
  return (
    <LinearGradient
      colors={weatherGradients[gradientType] || weatherGradients['Default']}
      style={styles.background}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default WeatherBackground;
