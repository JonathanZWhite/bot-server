'use strict'

const TelegramBot = require('node-telegram-bot-api')
const config = require('../config')
const Message = require('./Message')
const handlers = require('../handlers')
const store = require('../store')
const Promise = require('bluebird')

/**
 * ## Messenger
 * inteface for bot APIs
 */
class Messenger {
  constructor() {
    this.bot = new TelegramBot(config.telegram.token, { polling: true });
  }

  listen() {
    this.bot.onText(/^hi|hello|yo|sup$/i,
      this.handle.bind(this, handlers.casual.getGreeting));

    this.bot.onText(/help/i,
      this.handle.bind(this, handlers.casual.getHelp));

    this.bot.onText(/music/i,
      this.handle.bind(this, handlers.music.getRecommendation));

    return Promise.resolve()
  }

  handle(apiMethod, msg, match) {
    const message = new Message(Message.mapMessage(msg))
    const text = message.text

    store.push(message.from, message.text)

    return apiMethod(message, this.bot)
  }
}

module.exports = Messenger
