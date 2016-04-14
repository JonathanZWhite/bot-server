module.exports = {
  local: {
    telegram: {
      token: process.env.TELEGRAM_TOKEN || ''
    },
    api: {
      spotify: {
        clientId: process.env.SPOTIFY_CLIENT_ID || '',
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET || ''
      }
    }
  }
}['local']
