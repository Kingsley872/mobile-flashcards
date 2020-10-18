import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY, initData } from './_DATA'

// export function fetchDecksData () {
//   return AsyncStorage.getItem(DECK_STORAGE_KEY)
//           .then((data) => {
//             if(data === null) {
//               handleNoData()
//             }
//           })
// }

const setInitData = () => {
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(initData))
  return initData
}

export const getDecks = () => {
  AsyncStorage.clear()
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then( data => (
      data? JSON.parse(data):setInitData()
    ))
}
