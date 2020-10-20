import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'

import { whiteSmoke, deepskyblue, lightGreen, darkOrange } from '../utils/colors'
import SubTop from './SubTop'
import AppButton from './AppButton'

class Cards extends Component {
  state = {
    index: 0,
    numOfcorrect: 0,
    showAnswer: false,
    toDeck: false,
  }

  handleCorrectAnswer = () => {
    this.setState((prevState) => ({
      index: prevState.index + 1,
      showAnswer: false,
      numOfcorrect: prevState.numOfcorrect + 1
    }))
  }

  handleWrongAnswer = () => {
    this.setState((prevState) => ({
      index: prevState.index + 1,
      showAnswer: false,
    }))
  }

  handleShowAnswer = () => {
    this.setState(() => ({
      showAnswer: true,
    }))
  }

  toDeck = () => {
    this.props.navigation.pop()
  }

  resetQuiz = () => {
    this.setState(() => ({
      index: 0,
      numOfcorrect: 0,
      showAnswer: false,
      toDeck: false,
    }))
  }

    return

  render() {
    const { currDeck, decks } = this.props
    const questions = decks[currDeck].questions
    const len = questions.length

    const { index, numOfcorrect, showAnswer } = this.state

    const textOne = 'Quiz Time'
    const textTwo = `${index+1} / ${len}`

    if(index < len) {
      return (
        <View style={styles.container}>
          <SubTop
            textOne={textOne}
            textTwo={textTwo}
            />
          <View style={styles.questionBoard}>
            <Text>QUSTIONS: </Text>
            <Text>{questions[index].question}</Text>
          </View>

          { showAnswer
            ?(<View>
                <View style={styles.questionBoard}>
                  <Text>ANSWER: </Text>
                  <Text>{questions[index].answer}</Text>
                </View>
                <AppButton
                  title='CORRECT'
                  onPress={() => this.handleCorrectAnswer()}
                  color={lightGreen}
                  />
                <AppButton
                  title='INCORRECT'
                  onPress={() => this.handleWrongAnswer()}
                  color={darkOrange}
                  />
              </View>)
            : (<View>
                <AppButton
                  title='SHOW ANSWER'
                  onPress={this.handleShowAnswer}
                  color={deepskyblue}
                  />
              </View>)
          }
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <SubTop
            textOne='End of Quiz'
            textTwo={`Result: ${numOfcorrect} / ${len} --> ${((numOfcorrect / len) * 100).toFixed(0)}%`}
            />
          <AppButton
            title='RESTART QUIZ'
            onPress={this.resetQuiz}
            color={deepskyblue}
            />
          <AppButton
            title='RETRUN TO DECK'
            onPress={this.toDeck}
            color={darkOrange}
            />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  questionBoard: {
    backgroundColor: whiteSmoke,
    padding: 20,
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
});

function mapStateToProps(decks, { route }) {
  const { currDeck } = route.params

  return {
    currDeck: currDeck,
    decks: decks,
  }
}

export default  connect(mapStateToProps)(Cards)
/*


*/
