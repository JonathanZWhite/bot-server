'use strict'

const Promise = require('bluebird')
const logger = require('../utils/logger')
const store = require('../store')
const LocationService = require('../services/locations')

class Look {
    constructor() {}

    getLookString(message, bot) {
        store.getState(message.from)
        getRoomDescription(message, bot)

        function getRoomDescription(message, bot) {
            // room = LocationService
             var str = LocationService.getRoomDescription(message.from) 
             bot.sendMessage(message.from, str)
           }
        }
    }

module.exports = Look
