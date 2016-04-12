'use strict'

const Promise = require('bluebird')
const MusicService = require('../services/music')

class Music {
  constructor() {}

  get() {
    return MusicService.get()
  }
}

module.exports = Music
