'use strict'

const Promise = require('bluebird')
const MusicService = require('../services/music')
const logger = require('../utils/logger')

class Music {
  constructor() {}

  get(message, bot) {
    return MusicService.get()
      .then((resp) => {
        bot.sendMessage(message.from, 'Why not give this a listen 💃')

        bot.sendMessage(message.from, resp, {
          reply_markup: {
            keyboard: [
              ['I like it'],
              ['Not that great']
            ]
          }
        })
      })
      .catch(() => {
        logger.log('error', 'ERROR: ' + err);
      })
  }
}

module.exports = Music
