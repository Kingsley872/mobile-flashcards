import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { CommonActions } from '@react-navigation/native';

import { addCard } from '../actions'
import { addCardToDeck } from '../utils/api'
import AppTextInput from './AppTextInput'
import AppButton from './AppButton'
import SubTop from './SubTop'
import { deepskyblue } from '../utils/colors'

class AddCard extends Component {
  state = {
    questionText: '',
    answerText: '',
  }

  handleQestionOnChange = (text) => {
    this.setState(() => ({
      questionText: text,
    }))
  }

  handleAnswerOnChange = (text) => {
    this.setState(() => ({
      answerText: text
    }))
  }

  createCard = () => {
    const { dispatch, currDeck } = this.props
    const { questionText, answerText } = this.state
    const newCard = {
      question: questionText,
      answer: answerText,
    }

    Keyboard.dismiss()

    // update redux
    dispatch(addCard(
      currDeck,
      newCard,
    ))

    // reset state
    this.setState(() => ({
      questionText: '',
      answerText: '',
    }))

    // update AsyncStorage
    addCardToDeck(currDeck, newCard)

    // back to deck
    this.toDeck()
  }

  toDeck = () => {
    this.props.navigation.pop()
  }

  render() {
    const { currDeck } = this.props
    return (
      <View style={styles.container}>
        <SubTop
          textOne='Add an New Card'
          textTwo={`Under deck name: ${currDeck}`}
          />
        <AppTextInput
          placeholder='Question'
          onChangeText={(text) => this.handleQestionOnChange(text)}
          />
        <AppTextInput
          placeholder='Answer'
          onChangeText={(text) => this.handleAnswerOnChange(text)}
          />

        <AppButton
          title='CREATE A CARD'
          onPress={this.createCard}
          disabled={this.state.questionText === '' || this.state.answerText === ''}
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
});

function mapStateToProps(decks, { route }) {
  const { currDeck } = route.params
  return {
    currDeck: currDeck,
    decks: decks,
  }
}

export default connect(mapStateToProps)(AddCard)
