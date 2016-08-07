'use strict'

const Promise = require('bluebird')
const logger = require('../utils/logger')

class Casual {
  constructor() {}

  getGreeting(message, bot) {
    bot.sendMessage(message.from, 'Well hello there,' + message.from)
  }

  getUnrecognized(message, bot) {
    bot.sendMessage(message.from, 'Sorry I don\'t follow')
  }

  getHelp(message, bot) {
    bot.sendMessage(message.from, 'Here is what I can do 🤖', {
      reply_markup: {
        keyboard: [
          ['Music recommendation']
        ]
      }
    })
  }
}

module.exports = Casual
