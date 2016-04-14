'use strict'

const Promise = require('bluebird')
const logger = require('../utils/logger')

class Casual {
  constructor() {}

  getGreeting(message, bot) {
    bot.sendMessage(message.from, 'Well hello there 🤖')
  }

  getHelp(message, bot) {
    bot.sendMessage(message.from, 'Here is what I can do 🤖', {
      reply_markup: {
        keyboard: [
          ['Give a music recommendation']
        ]
      }
    })
  }
}

module.exports = Casual
