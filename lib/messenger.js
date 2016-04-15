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
    this.bot.on('message', this.handle.bind(this))

    return Promise.resolve()
  }

  handle(msg) {
    const message = new Message(Message.mapMessage(msg))
    const text = message.text

    if (inputParser.isGreeting(text))
      return handlers.casual.getGreeting(message, this.bot)

    if (inputParser.isAskingForGenreList(text))
      return handlers.music.getGenreList(message, this.bot)

    if (inputParser.isAskingForNumberOfRec(text, store.peek(message.from).command))
      return handlers.music.getNumOfRec(message, this.bot)

    if (inputParser.isAskingForRecommendation(text, store.peek(message.from).command))
      return handlers.music.getRecommendation(message, this.bot)

    // default
    return handlers.casual.getHelp(message, this.bot)
  }
}

module.exports = Messenger
