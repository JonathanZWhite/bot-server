'use strict'

const Promise = require('bluebird')
const MusicService = require('../services/music')
const logger = require('../utils/logger')

class Music {
  constructor() {}

  get() {
    return MusicService.get()
      .then((resp) => {
        return {
          type: 'text',
          content: [{
            text: 'Why not give this a listen 💃',
          }, {
            text: resp,
            keyboard: [
              ['I like it'],
              ['Not that great']
            ]
          }]
        }
      })
      .catch(() => {
        logger.log('error', 'ERROR: ' + err);
      })
  }
}

module.exports = Music
