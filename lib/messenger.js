'use strict'

const TelegramBot = require('node-telegram-bot-api')
const config = require('../config')
const api = require('../api')

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
  }

  /**
   * ## Handle
   * @param {object} msg
   * handles all incoming messages and maps to appropriate handler functions
   */
  handle(msg) {
    let handle = {}

    const message = new Message(_mapMessage(msg))
    const text = message.text

    switch (true) {
      case /hello/i.test(text):
        return this.sendMessage(message.from, '🤖')
      case /music/i.test(text):
        handle = api.handle(api.music.get)
    }

    handle.then((responses) => {
      responses.forEach((resp) => {
        console.log('setn')
        this.sendMessage(message.from, resp)
      })
    })
    .catch(() => {
      logger.log('error', 'ERROR: ' + err);
    })
  }

  sendMessage(from, content) {
    this.bot.sendMessage(from, content)
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

class Message {
  constructor(msg) {
    this.from = msg.from
    this.text = msg.text
    this.user = msg.user
  }
}

module.exports = Messenger
