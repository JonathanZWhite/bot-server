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
      this._handle.bind(this, handlers.casual.getGreeting));

    this.bot.onText(/help/i,
      this._handle.bind(this, handlers.casual.getHelp));

    this.bot.onText(/music/i,
      this._handle.bind(this, handlers.music.getRecommendation));

    return Promise.resolve()
  }

  _handle(apiMethod, msg, match) {
    const message = new Message(Message.mapMessage(msg))
    const text = message.text

    return apiMethod(message, this.bot)
  }

  _stateDebugger(from) {
    console.log('🔥  => Last state snapshot')
    console.log(store.getState(from))
  }
}

module.exports = Messenger
