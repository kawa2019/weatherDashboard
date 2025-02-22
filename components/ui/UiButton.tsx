import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface UIButtonProps {
  title?: string;
  onPress: () => void;
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor?: string;
  iconSize?: number;
  isIconOnly?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const UIButton: React.FC<UIButtonProps> = ({
  title,
  onPress,
  iconName,
  iconColor = 'black',
  iconSize = 24,
  isIconOnly = false,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      {iconName && (
        <MaterialCommunityIcons
          name={iconName}
          size={iconSize}
          color={iconColor}
        />
      )}
      {!isIconOnly && title && (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
});

export default UIButton;
