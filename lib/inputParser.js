'use strict';

const commands = require('../constants/commands')

class InputParser {
  isAskingForGenreList(text) {
    const pattern = /music/i

    return text.match(pattern) ? true : false
  }

  isAskingForRecommendation(text, prevCommand) {
    return prevCommand === commands.GET_GENRE_LIST
  }
}

module.exports = InputParser
