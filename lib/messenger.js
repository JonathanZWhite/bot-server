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
const VoiceParser = require('./voiceParser')
const voiceParser = new VoiceParser()

/**
 * ## Messenger
 * inteface for bot APIs
 */
class Messenger {
  constructor() {
    this.bot = new TelegramBot(config.telegram.token, { polling: true });
  }

  listen() {
    this.bot.on('voice', this.handleVoice.bind(this))
    this.bot.on('text', this.handleText.bind(this))

    return Promise.resolve()
  }

  handleVoice(msg) {
    return Promise.resolve()
      .then(getFile.bind(this))
      .then(getFileLink.bind(this))
      .then(voiceParser.parse)
      .then((resp) => {
        msg.text = resp
        this.handleText(msg)
      })

    function getFile() {
      return this.bot.getFile(msg.voice.file_id)
    }

    function getFileLink(resp) {
      return this.bot.getFileLink(resp.file_id)
    }
  }

  handleText(msg) {
    const message = new Message(Message.mapMessage(msg))
    const text = message.text

    logger.info('message received: ' + message.text)

    if (inputParser.isGreeting(text)) {
        return handlers.casual.getGreeting(message, this.bot);
    }

    if (inputParser.isLook(text)){
      return handlers.look.getLookString(message, this.bot);
    }

    if (inputParser.isExit(text)) {
      return
    }


    // if (inputParser.isExit(text)){
    //   publish.('handlers.command.getLookString', [message, this.bot]);
    // };

    // default
    if (inputParser.isHelp(text)) {
        return handlers.casual.getHelp(message, this.bot)
      }

    return handlers.casual.getUnrecognized
    }
}

module.exports = Messenger
