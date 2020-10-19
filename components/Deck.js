import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { CommonActions } from '@react-navigation/native'
import Cards from './Cards'
import { removeDeck } from '../utils/api'
import { removeDeckFromRedux } from '../actions/index'


class Deck extends Component {

  handleDeleteDeck = () => {
    const { dispatch, deckName } = this.props

    // update redux
    dispatch(removeDeckFromRedux(deckName))

    // delete form AsyncStorage
    removeDeck(deckName)

    this.toHome()
  }

  toHome = () => {
    this.props.navigation.navigate(
      'Home'
    )
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextState !== null
  }

  render() {

    const { deckName, deck } = this.props
    const numOfCards = deck.questions.length

    return (
      <View style={styles.container}>
        <Text>{deck.title}</Text>
        <Text>{numOfCards}</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.push(
            "AddCard",
            {currDeck: deckName}
          )}
          >
          <Text>
            AddCard
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.push(
            "Quiz",
            {currDeck: deckName}
          )}
          disabled={numOfCards === 0}
          >
          <Text>
            Start Quiz
          </Text>
          {
            numOfCards === 0
              ? <Text>Need at least one card to start quiz</Text>
              : null
          }
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.handleDeleteDeck} >
          <Text>
            Delete Deck
          </Text>
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

function mapStateToProps(decks, { route, navigation }) {
  const { deckName } = route.params
  // console.log('deck------------------------------------------', decks[deckName])
  return {
    deckName: deckName,
    deck: decks[deckName]
  }
}

export default connect(mapStateToProps)(Deck)
