import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'

import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { grey, white, lightseagreen, deepskyblue, lightcyan } from '../utils/colors'

class DeckList extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    getDecks()
      .then(decks => {
        dispatch(receiveDecks(decks))
      })
  }

  render() {
    const { decks, sortedDecksTitle } = this.props
    const numOfDecks = Object.keys(decks).length

    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.topText}>Mobile</Text>
          <Text style={styles.topText}>Flash Cards</Text>
        </View>
          <Text style={styles.numOfDecksText}>{numOfDecks} Decks</Text>
        <ScrollView>
          {
            sortedDecksTitle.map(key => (
              <TouchableOpacity
                style={[styles.top, { backgroundColor: lightcyan }, { height: 100}]}
                key={key}
                onPress={() => this.props.navigation.navigate(
                  'AddCardNav',
                  {
                    screen: 'Deck',
                    params: { deckName: key },
                  }
                )}
                >
                <Text style={styles.deckText}>{key} ({decks[key].questions.length} flash-cards)</Text>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  top: {
    backgroundColor: deepskyblue,
    height: 150,
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
  numOfDecksText: {
    fontSize: 14,
    marginTop:8,
    marginLeft: 20,
    marginBottom: 8,
  },
  topText: {
    fontSize: 22,
    color: white,
    textAlign: 'center'
  },
  deckText: {
    fontSize: 18,
    color: grey,
    marginLeft: 20,
  }
});

function mapStateToProps(decks) {
  const sortedDecksTitle = Object.keys(decks).sort()
  return {
    decks: decks,
    sortedDecksTitle: sortedDecksTitle,
  }
}

export default connect(mapStateToProps)(DeckList)
