import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { CommonActions } from '@react-navigation/native';
import { deepskyblue } from '../utils/colors'

import { saveDeckTitle } from '../utils/api'
import { addDeck } from '../actions'
import AppButton from './AppButton'
import AppTextInput from './AppTextInput'

class AddDeck extends Component {
  state = {
    value: '',
    existDeckName: false,
  }

  handleOnChange = (text) => {
    this.setState(() => ({
      value: text
    }))
  }

  createDeck = () => {
    const { dispatch } = this.props
    const { value } = this.state

    Keyboard.dismiss()
    // update store
    dispatch(addDeck({
      [value]: {
        title: value,
        questions: []
      }
    }))

    // reset state
    this.setState(() => ({
      value: ''
    }))

    // update AsyncStorage
    saveDeckTitle(value)

    // back home page
    this.toHome()
  }

  toHome = () => {
    this.props.navigation.dispatch(
      CommonActions.goBack({
        key: 'DeckList'
      })
    )
  }

  render() {
    if(this.state.existDeckName) {
      return (
        <View style={styles.container}>
          <text>Deck name is already exist</text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={styles.topText}>What is the title of your new deck</Text>

        <AppTextInput
          value={this.state.value}
          onChangeText={(text) => this.handleOnChange(text)}
          />
        <AppButton
          title="Create a deck"
          onPress={this.createDeck}
          color={deepskyblue}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topText: {
    fontSize: 22,
    marginTop: 20,
    textAlign: 'center'
  },
});

function mapStateToProps(decks) {
  return {decks}
}

export default connect(mapStateToProps)(AddDeck)
