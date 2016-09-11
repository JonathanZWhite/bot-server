'use strict'

const TelegramBot = require('node-telegram-bot-api')
const config = require('../config')
const Message = require('./message')
const handlers = require('../handlers')
const store = require('../store')
const Promise = require('bluebird')
const InputParser = require('./inputParser')
const logger = require('../utils/logger')
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
    this.bot.on('text', this.handleText.bind(this))

    return Promise.resolve()
  }



  handleText(msg) {
    const message = new Message(Message.mapMessage(msg))
    const text = message.text

    logger.info('message received: ' + message.text)

    if (inputParser.isGreeting(text)) {
        return handlers.casual.getGreeting(message, this.bot);
    }

    // default
    if (inputParser.isHelp(text)) {
        return handlers.casual.getHelp(message, this.bot)
      }

    return handlers.casual.getUnrecognized
    }
}

module.exports = Messenger
