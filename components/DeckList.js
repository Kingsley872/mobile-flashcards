import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
// import { getDecks, initDecks } from '../utils/_DATA'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'
// import Deck from './Deck'

class DeckList extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    getDecks()
      .then(decks => {
        dispatch(receiveDecks(decks))
      })
  }

  render() {
    const { decks } = this.props

    return (
      <View style={styles.container}>
        {
          Object.keys(decks).map(key => (
            <TouchableOpacity key={key}
              onPress={() => this.props.navigation.navigate(
                'AddCardNav',
                {
                  screen: 'Deck',
                  params: { deckName: key },
                }
              )}
              >
              <Text>{key}</Text>
            </TouchableOpacity>
          ))
        }
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
  console.log('Decks---------------------------------------------------', decks)
  return {
    decks: decks
  }
}

export default connect(mapStateToProps)(DeckList)
