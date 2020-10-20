import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { lightcyan, grey } from '../utils/colors'

export default function AppButton ({ textOne, textTwo }) {
  return (
    <View style={styles.top}>
      <Text style={styles.topText}>{textOne}</Text>
      <Text style={styles.topText}>{textTwo}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  top: {
    backgroundColor: lightcyan,
    height: 100,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    borderRadius: 10,
  },
  topText: {
    fontSize: 18,
    color: grey,
    marginLeft: 20,
  },
})
