'use strict';

class InputParser {

  // testing
  isGreeting(text) {
    const pattern = /hi|sup|hello|yo/i

    return text.match(pattern)
  }

  isHelp(text) {
    const pattern = /help/i

    return text.match(pattern)
  }

}

module.exports = InputParser
