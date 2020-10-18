import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'moblieFlash:data'
export const initData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export function getDecks () {
  console.log(JSON.parse(async () => await AsyncStorage.getItem(DATA_STORAGE_KEY)))
  // AsyncStorage.clear();
  // AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(initData))
  // return AsyncStorage.getItem(DECK_STORAGE_KEY)
  // return AsyncStorage.getItem(DECK_STORAGE_KEY)
  //   .then(results => {
  //     if(results === null){
  //       AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(initData))
  //     }
  //   })
  // return AsyncStorage.getItem(DECK_STORAGE_KEY, (err, results) => {
  //           console.log('results: ----------->', results)
  //           if(results === null) {
  //             AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(initData))
  //             return AsyncStorage.getItem(DECK_STORAGE_KEY)
  //           }
  //         })
// }

function getDeck () {

}

function saveDeckTitle () {

}

function addCardToDeck () {

}

// function initDecks () {
//   AsyncStorage.setItem(
//     DECK_STORAGE_KEY,
//     JSON.stringify(initData)
//   )
//
//   return JSON.parse(initData)
// }
// //
// function handleData(results){
//   if(results === null) {
//     return initData()
//   } else {
//     return JSON.parse(results)
//   }
}
