const Music = require('./music')
const Casual = require('./casual')
const Look = require('./look')

module.exports = {
  casual: new Casual(),
  music: new Music(),
  look: new Look()
}
