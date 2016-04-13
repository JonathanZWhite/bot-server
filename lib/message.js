'use strict'

class Message {
  constructor(msg) {
    this.from = msg.from
    this.text = msg.text
    this.user = msg.user
  }
}

module.exports = Message
