import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import UiButton from '@/components/ui/UiButton';

interface RetryErrorMessageProps {
  message?: string;
  onRetry: () => void;
}

const defaultMessage: string = 'Failed to load data. Please try again later.';

const RetryErrorMessage: React.FC<RetryErrorMessageProps> = ({
  message = defaultMessage,
  onRetry,
}) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name='alert-circle-outline'
        size={40}
        color='#ff4d4d'
      />
      <Text style={styles.message}>{message}</Text>
      <UiButton
        style={styles.retryButton}
        textStyle={styles.retryText}
        title={'Retry'}
        onPress={onRetry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe6e6',
    padding: 16,
    borderRadius: 8,
    marginVertical: 10,
  },
  message: {
    fontSize: 16,
    color: '#b30000',
    textAlign: 'center',
    marginVertical: 8,
  },
  retryButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 10,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RetryErrorMessage;
