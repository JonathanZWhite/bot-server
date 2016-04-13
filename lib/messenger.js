'use strict'

const TelegramBot = require('node-telegram-bot-api')
const config = require('../config')
const api = require('../api')
const Message = require('./Message')
const handlers = require('../handlers')

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

    const message = new Message(_mapMessage(msg))
    const text = message.text

    switch (true) {
      case /hello/i.test(text):
        return this.sendMessage(message.from, '🤖')
      case /music/i.test(text):
        handlers.music.get(message, this.bot)
    }
  }

  sendMessage(from, text, keyboard) {
    const opts = {
      reply_markup: JSON.stringify({
        keyboard: keyboard
      })
    }

    this.bot.sendMessage(from, text, opts)
  }

  sendPhoto(from) {
    console.log('Sending a photo 📷')
  }
}

function _mapMessage(msg) {
  return {
    from: msg.from.id,
    text: msg.text,
    user: {
      firstName: msg.from.first_name,
      lastName: msg.from.last_name
    }
  }
}

module.exports = Messenger
