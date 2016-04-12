'use strict'

const Promise = require('bluebird')

class WeatherHandler {
  constructor() {}

  getWeather() {
    return Promise.resolve('weather 🐣')
  }
}

module.exports = WeatherHandler
