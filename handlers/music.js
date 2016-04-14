'use strict'

const _ = require('lodash-node')
const Promise = require('bluebird')
const MusicService = require('../services/music')
const logger = require('../utils/logger')
const store = require('../store')
const commands = require('../constants/commands')
const genresJSON = require('../data/genres')
const Spotify = require('spotify-web-api-node');
const State = require('../store/state')

class Music {
  constructor() {}

  getGenreList(message, bot) {
    // clears store for new command tree
    store.clear(message.from)
    store.push(message.from, new State(commands.GET_GENRE_LIST, {}))

    bot.sendMessage(message.from, 'Choose a genre you would like a recommendation for 🎵', {
      reply_markup: {
        keyboard: genresJSON.genres,
        one_time_keyboard: true
      }
    })
  }

  getNumOfRec(message, bot) {
    const selectedGenre = message.text
    // case: genre is NOT inside list
    if (!_.some(genresJSON.genres, [selectedGenre])) {
      return bot.sendMessage(message.from, 'Uh oh! Looks like that isn\'t in the list. Try again 🙌', {
        reply_markup: {
          keyboard: genresJSON.genres,
          one_time_keyboard: true
        }
      })
    }

    store.push(message.from, new State(commands.SET_NUMBER_OF_REC, {
      genre: selectedGenre
    }))

    bot.sendMessage(message.from, 'How many songs would you like?', {
      reply_markup: {
        keyboard: [
          ['1'], ['2'], ['3'], ['4']
        ],
        one_time_keyboard: true
      }
    })
  }

  getRecommendation(message, bot) {
    const state = store.peek(message.from)

    const selectedGenre = state.data.genre
    const limit = message.text

    // case: get recommendation
    return MusicService.getRecommendation(selectedGenre, limit)
      .then((resp) => {
        // case: no recommendation
        if (!resp.length) {
          return bot.sendMessage(message.from, 'Sorry, looks like I don\'t have anything for that category 🐣')
        }

        bot.sendMessage(message.from, 'Why not give this a listen 💃')

        resp.forEach((song) => {
          bot.sendMessage(message.from, song, {
            parse_mode: 'HTML'
          })
        })
      })
  }
}

module.exports = Music
