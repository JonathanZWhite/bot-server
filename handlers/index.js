const Music = require('./music')
const Casual = require('./casual')

module.exports = {
  casual: new Casual(),
  music: new Music()
}
