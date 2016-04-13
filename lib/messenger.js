'use strict'

const TelegramBot = require('node-telegram-bot-api')
const config = require('../config')
const Message = require('./Message')
const handlers = require('../handlers')
const store = require('../store')

/**
 * ## Messenger
 * inteface for bot APIs
 */
class Messenger {
  constructor() {
    this.bot = new TelegramBot(config.telegram.token, { polling: true });
  }

  listen() {
    console.log('🤖  Listening to incoming messages')
    this.bot.on('message', this.handle.bind(this))
  }

  /**
   * ## Handle
   * @param {object} msg
   * handles all incoming messages and maps to appropriate handler functions
   */
  handle(msg) {
    let handle

    const message = new Message(Message.mapMessage(msg))
    const text = message.text

    // registers last message and treats the hashtable value
    // as a stack
    store.push(message.from, message.text)

    switch (true) {
      case /hello/i.test(text):
        return this.sendMessage(message.from, '🤖')
      case /music/i.test(text):
        handlers.music.get(message, this.bot)
    }

    this._stateDebugger(message.from)
  }

  _stateDebugger(from) {
    console.log('🔥  => Last state snapshot')
    console.log(store.getState(from))
  }
}

module.exports = Messenger
