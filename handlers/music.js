'use strict'

const _ = require('lodash-node')
const Promise = require('bluebird')
const MusicService = require('../services/music')
const logger = require('../utils/logger')
const store = require('../store')
const commands = require('../constants/commands')
const genresJSON = require('../data/genres')
const Spotify = require('spotify-web-api-node');

class Music {
  constructor() {}

  getGenreList(message, bot) {
    // clears store for new command tree
    store.clear(message.from)
    store.update(message.from, { command: commands.GET_GENRE_LIST })

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

    store.update(message.from, {
      command: commands.SET_NUMBER_OF_REC,
      spotify: {
        genre: selectedGenre
      }
    })

    console.log(store.getState(message.from))

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
    store.update(message.from, {
      command: commands.GET_RECOMMENDATION,
      spotify: {
        numberOfRecs: message.text
      }
    })

    const state = store.getState(message.from)

    const selectedGenre = state.spotify.genre
    const numberOfRecs = state.spotify.numberOfRecs

    // case: get recommendation
    return MusicService.getRecommendation(selectedGenre, numberOfRecs)
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
