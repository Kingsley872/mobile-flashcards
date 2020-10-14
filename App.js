import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Moblie flashcard project</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
