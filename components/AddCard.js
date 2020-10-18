import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { CommonActions } from '@react-navigation/native';

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

    Keyboard.dismiss()

    dispatch(addCard(
      questionText,
      answerText,
      currDeck,
    ))

    this.setState(() => ({
      questionText: '',
      answerText: '',
    }))


    this.toDeck()
  }

  toDeck = () => {
    // this.props.navigation.dispatch(
    //   CommonActions.goBack({
    //     key: 'Deck'
    //   })
    // )
    this.props.navigation.pop()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Under {this.props.currDeck} deck</Text>
        <TextInput
          placeholder="Question"
          style={{ height: 40, width: 80, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.handleQestionOnChange(text)}
          />
        <TextInput
          placeholder="Answer"
          style={{ height: 40, width: 80, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.handleAnswerOnChange(text)}
          />
        <TouchableOpacity
          onPress={this.createCard}
          disabled={this.state.questionText === '' || this.state.answerText === ''}
          >
          <Text>Create a new card</Text>
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
  },
});

function mapStateToProps(decks, { route }) {
  const { currDeck } = route.params
  console.log('addcard ----------------------------', decks[currDeck].questions)
  return {
    currDeck: currDeck,
    decks: decks,
  }
}

export default connect(mapStateToProps)(AddCard)
