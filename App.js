import React, { Component } from 'react'
import { Text, StyleSheet, View, StatusBar, Platform } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { purple, blue, white, deepskyblue } from './utils/colors'

import Constants from "expo-constants"
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack"
// import * as Permissions from 'expo-permissions'
import * as Notifications from "expo-notifications"

import { setLocalNotification } from './utils/api'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import Deck from './components/Deck'
import reducer from "./reducers"
import AddCard from './components/AddCard'
import Cards from './components/Cards'

function AppStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}


const Tabs =
  Platform.OS === "ios"
    ? createBottomTabNavigator()
    : createMaterialBottomTabNavigator();

const TabNav = () => (
  <Tabs.Navigator
    initialRouteName="DeckList"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let icon;
        if (route.name === "DeckList") {
          icon = <FontAwesome name="plus-square" size={size} color={color} />;
        } else if (route.name === "AddDeck") {
          icon = <Ionicons name="ios-bookmarks" size={size} color={color} />;
        }
        return icon;
      },
    })}
    tabBarOptions={{
      header: null,
      activeTintColor: Platform.OS === "ios" ? blue : white,
      showIcon: true,
      style: {
        height: 80,
        backgroundColor: Platform.OS === "ios" ? white : blue,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    }}
  >
    <Tabs.Screen name="DeckList" component={DeckList} />
    <Tabs.Screen name="AddDeck" component={AddDeck} />
  </Tabs.Navigator>
)

const RootStack = createStackNavigator();
const NestedStack = createStackNavigator();

const AddCardNav = () => (
  <NestedStack.Navigator >
    <NestedStack.Screen
      name="Deck"
      component={Deck}
      />
    <NestedStack.Screen
      name="AddCard"
      component={AddCard}
      />
    <NestedStack.Screen
      name="Quiz"
      component={Cards}
      />
  </NestedStack.Navigator>
)

const MainNav = () => (
  <RootStack.Navigator >
    <RootStack.Screen
      name="Home"
      component={TabNav}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="AddCardNav"
      component={AddCardNav}
      options={{ headerShown: false }}
    />
  </RootStack.Navigator>
)

// This function is for testing 
// async function scheduleAndCancel() {
//   await Notifications.cancelScheduledNotificationAsync('9beb4aa9-38f1-4aa0-8da3-606782bac169')
// }

export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>

        <View style={{ flex: 1}}>
          <NavigationContainer>
            <AppStatusBar backgroundColor={deepskyblue} barStyle='light-content' />
            <MainNav />
          </NavigationContainer>
        </View>

      </Provider>
    )
  }
}
