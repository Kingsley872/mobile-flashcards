import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { CommonActions } from '@react-navigation/native'

import Cards from './Cards'
import { removeDeck } from '../utils/api'
import { removeDeckFromRedux } from '../actions/index'
import { grey, lightcyan, deepskyblue, lightGreen, darkOrange, red } from '../utils/colors'
import AppButton from './AppButton'
import SubTop from './SubTop'

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

  shouldComponentUpdate (nextProps) {
    return nextProps.deck !== undefined
  }

  render() {

    const { deckName, deck } = this.props
    const numOfCards = deck.questions.length
    const textOne = 'Deck Name: ' + deck.title
    const textTwo = 'Number of flash cards: [' + numOfCards + ']'

    return (
      <View style={styles.container}>
        <SubTop
          textOne={textOne}
          textTwo={textTwo}
          />

        <AppButton
          title={'Add a Card'}
          onPress={() => this.props.navigation.push(
            "AddCard",
            {currDeck: deckName}
          )}
          color={deepskyblue}
        />

        <AppButton
          title={'Start Quiz'}
          onPress={() => this.props.navigation.push(
            "Quiz",
            {currDeck: deckName}
          )}
          disabled={numOfCards === 0}
          color={lightGreen}
        />
        {
          numOfCards === 0
            ? <Text style={styles.warningText}>
                Need at least one card to start quiz
              </Text>
            : null
        }

        <AppButton
          title={'Delete Deck'}
          onPress={this.handleDeleteDeck}
          color={darkOrange}
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
  warningText: {
    alignSelf: 'center',
    color: red,
    fontSize: 12,
  }
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
