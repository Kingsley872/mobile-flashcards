import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { lightcyan, grey } from '../utils/colors'

export default function AppTextInput ({ placeholder='', value, onChangeText }) {
  return (
    <TextInput
      style={styles.textInput}
      value={value}
      onChangeText={(text) => onChangeText(text)}
      placeholder={placeholder}
    />
  )
}

const styles = StyleSheet.create({
  textInput: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    height: 40,
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
  },
})
