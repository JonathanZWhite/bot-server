'use strict'

/**
 * ## Store
 * temporary state store for information about
 * users that the bot is interfacing with
 */
let store = {
  _users: {},

  getState: function(hash) {
    if (!this._users[hash]) return []

    return this._users[hash]
  },

  push: function(hash, data) {
    if (!this._users[hash]) this._users[hash] = []

    this._users[hash].push(data)
  },

  peek: function(hash) {
    if (!this._users[hash]) return []

    const top = this._users[hash].length - 1

    return this._users[hash][top]
  }
}

module.exports = store
