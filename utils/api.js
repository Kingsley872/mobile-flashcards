import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY, INIT_DATA } from './_DATA'

const setInitData = () => {
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(INIT_DATA))
  return INIT_DATA
}

export const getDecks = () => {
  AsyncStorage.clear()
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then( data => (
      data? JSON.parse(data):setInitData()
    ))
}

export function saveDeckTitle (deckTitle) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [deckTitle]: {
      title: deckTitle,
      questions: []
    }}))
}

export function addCardToDeck (deckTitle, newCard) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      const newQuestions = [...data[deckTitle].questions, newCard]
      data[deckTitle].questions = newQuestions
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })

}

export function removeDeck (deckTitle) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[deckTitle] = undefined
      delete data[deckTitle]
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })
}
