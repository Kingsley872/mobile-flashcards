import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY, INIT_DATA, NOTIFICATION_KEY } from './_DATA'
import * as Permissions from 'expo-permissions'
import * as Notifications from "expo-notifications";

const setInitData = () => {
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(INIT_DATA))
  return INIT_DATA
}

export const getDecks = () => {
  // AsyncStorage.clear()
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

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted'){

              const trigger = new Date();
              trigger.setDate(trigger.getDate() + 1)
              trigger.setHours(20)
              trigger.setMinutes(0)
              trigger.setSeconds(0)
              // console.log(trigger);

              Notifications.scheduleNotificationAsync({
                content: {
                  title: 'FlashCards',
                  body : 'Do not forget quiz yourslef today!',
                }, trigger,
              })
              .then(notification=>{
                  console.log('notification', notification);
                  AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              })
              .catch(e=>console.log("error in scheduleNotificationAsync ",e))
            }
          })
      }
    })
}
