'use strict'

let store = {
  // hashtable of users
  users: {},

  getState: function(hash) {
    return user[hash]
  },

  push: function(hash, data) {
    if (!user[hash]) user[hash] = []

    user[hash].push(data)
  }
}

module.exports = store
