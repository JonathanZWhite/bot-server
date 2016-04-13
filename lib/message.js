'use strict'

class Message {
  constructor(msg) {
    this.from = msg.from
    this.text = msg.text
    this.user = msg.user
  }

  static mapMessage(msg) {
    return {
      from: msg.from.id,
      text: msg.text,
      user: {
        firstName: msg.from.first_name,
        lastName: msg.from.last_name
      }
    }
  }
}

module.exports = Message
