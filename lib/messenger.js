'use strict'

const TelegramBot = require('node-telegram-bot-api')
const config = require('../config')
const Message = require('./Message')
const handlers = require('../handlers')
const store = require('../store')
const Promise = require('bluebird')
const InputParser = require('./InputParser')
const inputParser = new InputParser()

/**
 * ## Messenger
 * inteface for bot APIs
 */
class Messenger {
  constructor() {
    this.bot = new TelegramBot(config.telegram.token, { polling: true });
  }

  listen() {
    // this.bot.onText(/^hi|hello|yo|sup$/i,
    //   this.handle.bind(this, handlers.casual.getGreeting));
    //
    // this.bot.onText(/help/i,
    //   this.handle.bind(this, handlers.casual.getHelp));
    //
    // this.bot.onText(/music/i,
    //   this.handle.bind(this, handlers.music.getGenreList));
    //
    // this.bot.onText(/music/i,
    //   this.handle.bind(this, handlers.music.getGenreList));

    this.bot.on('message', this.handle.bind(this))

    return Promise.resolve()
  }

  handle(msg) {
    const message = new Message(Message.mapMessage(msg))
    const text = message.text

    if (inputParser.isAskingForGenreList(text))
      return handlers.music.getGenreList(message, this.bot)

    if (inputParser.isAskingForRecommendation(text, store.peek(message.from)))
      return handlers.music.getRecommendation(message, this.bot)
  }

  // handle(apiMethod, msg, match) {
  //   const message = new Message(Message.mapMessage(msg))
  //   const text = message.text
  //
  //   return apiMethod(message, this.bot)
  // }
}

module.exports = Messenger
