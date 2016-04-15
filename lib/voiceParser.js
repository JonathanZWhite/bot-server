'use strict';

const commands = require('../constants/commands')
const Promise = require('bluebird')

class VoiceParser {
  parse() {
    return Promise.resolve('Hello')
  }
}

module.exports = VoiceParser
