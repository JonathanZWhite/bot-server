'use strict'

const Promise = require('bluebird')
const logger = require('../utils/logger')
const store = require('../store')
const LocationService = require('../services/locations')

class Look {
  constructor() {}

  getLookString(message, bot) {
  	store.getState(message.from)
  	console.log('roomlist', LocationService.roomsList)
	getRoomDescription(message, bot)

  	function getRoomDescription(message, bot) {
  	// room = LocationService
  	return LocationService.getRoomDescription(message.from)
  }
  }
}

module.exports = Look
