'use strict'

const _ = require('lodash-node')

/**
 * ## Store
 * temporary state store for information about
 * users that the bot is interfacing with
 */
let store = {
  _users: {},

  // creates state tree
  _initializeUser: function(hash) {
    this._users[hash] = {
      command: '',
      current_location: 0
    }
  },

  update: function(hash, data) {
    if (!this._users[hash]) this._initializeUser(hash)

    console.log('🌑  => PREVIOUS STATE')
    console.log(this.getState(hash))

    this._users[hash] = _.merge(this._users[hash], data)

    console.log('🌕  => NEXT STATE')
    console.log(this.getState(hash))
  },

  getState: function(hash) {
    if (!this._users[hash]) return this._initializeUser(hash)

    return this._users[hash]
  },

  clearState: function(hash) {
    this._users[hash] = this._initializeUser()
  }
}

module.exports = store
