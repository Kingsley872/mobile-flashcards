import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

class Deck extends Component {
  render() {
    const { deckName, deck } = this.props
    // const numOfCards = Object.keys(deck).length
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

        <TouchableOpacity>
          <Text>
            Start Quiz
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
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
  console.log('deck------------------------------------------', decks[deckName])
  return {
    deckName: deckName,
    deck: decks[deckName]
  }
}

export default connect(mapStateToProps)(Deck)
