import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

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

  // recordResult = (result) => {
  //   this.setState((prevState) => ({
  //     numOfcorrect: prevState.numOfcorrect + parseInt(result)
  //   }))
  // }

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

  render() {
    const { currDeck, decks } = this.props
    const questions = decks[currDeck].questions
    const len = questions.length

    const { index, numOfcorrect, showAnswer } = this.state

    if(index < len) {
      return (
        <View style={styles.container}>
          <Text>INDEX: </Text>
          <Text>{index+1} / {len}</Text>
          <Text>QUSTIONS: </Text>
          <Text>{questions[index].question}</Text>
          <TouchableOpacity onPress={this.handleShowAnswer}>
            <Text>
              SHOW ANSWER
            </Text>
          </TouchableOpacity>
          { showAnswer
            ? (<View>
                <Text>ANSWER: </Text>
                <Text>{questions[index].answer}</Text>
                <TouchableOpacity onPress={() => this.handleCorrectAnswer()}>
                  <Text>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleWrongAnswer()}>
                  <Text>Incorrect</Text>
                </TouchableOpacity>
              </View>)
            : null
          }
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text>END OF Quiz</Text>
          <Text>RESULT: </Text>
          <Text>{numOfcorrect} / {len}</Text>
          <TouchableOpacity onPress={this.resetQuiz}>
            <Text>RESTART QUIZ</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.toDeck}>
            <Text>RETRUN TO DECK</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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
