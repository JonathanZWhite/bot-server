'use strict'

const Promise = require('bluebird')
const MusicService = require('../services/music')
const logger = require('../utils/logger')

class Music {
  constructor() {}

  getRecommendation(message, bot) {
    return MusicService.getRecommendation()
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
