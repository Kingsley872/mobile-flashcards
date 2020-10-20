import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function AppButton ({ onPress, title, color, disabled=false }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.appButtonContainer,
        {backgroundColor: color}]}
      disabled={disabled}
      >
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  appButtonContainer: {
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    shadowRadius: 10,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height:5
    },
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
})
