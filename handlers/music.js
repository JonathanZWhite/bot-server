'use strict'

const _ = require('lodash-node')
const Promise = require('bluebird')
const MusicService = require('../services/music')
const logger = require('../utils/logger')
const store = require('../store')
const commands = require('../constants/commands')
const genresJSON = require('../data/genres')

class Music {
  constructor() {}

  getGenreList(message, bot) {
    // clears store for new command tree
    store.clear(message.from)
    store.push(message.from, commands.GET_GENRE_LIST)

    bot.sendMessage(message.from, 'Choose a genre you would like a recommendation for 🎵', {
      reply_markup: {
        keyboard: genresJSON.genres,
        one_time_keyboard: true
      }
    })
  }

  getRecommendation(message, bot) {
    const genresJSON = require('../data/genres.json')

    // case: genre is NOT inside list
    if (!_.some(genresJSON.genres, [message.text])) {
      return bot.sendMessage(message.from, 'Uh oh! Looks like that isn\'t in the list. Try again 🙌', {
        reply_markup: {
          keyboard: genresJSON.genres,
          one_time_keyboard: true
        }
      })
    }

    // return MusicService.getRecommendation()
    //   store.push(message.from, message.text)
    //
    //   .then((resp) => {
    //     bot.sendMessage(message.from, 'Why not give this a listen 💃')
    //
    //     bot.sendMessage(message.from, resp, {
    //       reply_markup: {
    //         keyboard: [
    //           ['I like it'],
    //           ['Not that great']
    //         ]
    //       }
    //     })
    //   })
    //   .catch(() => {
    //     logger.log('error', 'ERROR: ' + err);
    //   })
  }
}

module.exports = Music
