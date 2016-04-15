'use strict';

const commands = require('../constants/commands')

class InputParser {
  // music
  isAskingForGenreList(text) {
    const pattern = /music|recommendation/i

    return text.match(pattern) ? true : false
  }

  isAskingForNumberOfRec(text, prevCommand) {
    return prevCommand === commands.GET_GENRE_LIST
  }

  isAskingForRecommendation(text, prevCommand) {
    return prevCommand === commands.SET_NUMBER_OF_REC
  }

  // casual
  isGreeting(text) {
    const pattern = /hi|sup|hello|yo/i

    return text.match(pattern) ? true : false
  }
}

module.exports = InputParser
