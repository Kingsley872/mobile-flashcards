import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD,
  REMOVE_DECK,
 } from '../actions/index'

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }

    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      }

    case ADD_CARD:

      const newQuestins = state[action.currDeck].questions.concat([action.card])

      return {
        ...state,
        [action.currDeck]: {
          ...state[action.currDeck],
          questions: newQuestins,
        },
      }

    case REMOVE_DECK:
      const newState = state
      newState[action.targetDeckTitle] = undefined
      delete newState[action.targetDeckTitle]

      return{
        ...state,
        ...newState,
      }

    default:
      return state
  }
}

export default decks
