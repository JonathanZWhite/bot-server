require('dotenv').config()
module.exports = {
  local: {
    telegram: {
      token: process.env.TELEGRAM_TOKEN || ''
    }
  }
}['local']
