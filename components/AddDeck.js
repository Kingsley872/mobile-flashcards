import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { CommonActions } from '@react-navigation/native';

import { addDeck } from '../actions'

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

    Keyboard.dismiss()
    dispatch(addDeck({
      [this.state.value]: {
        title: this.state.value,
        questions: []
      }
    }))

    this.setState(() => ({
      value: ''
    }))

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
        <Text>What is the title of your new deck</Text>
        <TextInput
          style={{ height: 40, width: 80, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.handleOnChange(text)}
          />
        <TouchableOpacity
          onPress={this.createDeck}
          disabled={this.state.value === ''}
          >
          <Text>Create a Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(decks) {
  return {decks}
}

export default connect(mapStateToProps)(AddDeck)
