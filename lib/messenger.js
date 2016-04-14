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
    this.bot.onText(/\/echo (.+)/,
      this.handle.bind(this, handlers.casual.getGreeting));


    return Promise.resolve()
  }

  handle(apiMethod, msg, match) {
    const message = new Message(Message.mapMessage(msg))
    const text = message.text

    return apiMethod(message, this.bot)
  }

  // /**
  //  * ## Handle
  //  * @param {object} msg
  //  * handles all incoming messages and maps to appropriate handler functions
  //  */
  // handle(msg) {
  //   let handle
  //
  //   const message = new Message(Message.mapMessage(msg))
  //   const text = message.text
  //
  //   switch (true) {
  //     // case: hello
  //     case /^hi|hello|yo|sup$/i.test(text):
  //       return handlers.casual.getGreeting(message, this.bot)
  //
  //     // case: help
  //     case /help/i.test(text):
  //       return handlers.casual.getHelp(message, this.bot)
  //
  //     // case: give me a music recommendation
  //     case /music/i.test(text):
  //       handlers.music.getRecommendation(message, this.bot)
  //   }
  //
  //   // registers last message and treats the hashtable value
  //   // as a stack
  //   store.push(message.from, message.text)
  //   this._stateDebugger(message.from)
  // }

  _stateDebugger(from) {
    console.log('🔥  => Last state snapshot')
    console.log(store.getState(from))
  }
}

module.exports = Messenger
