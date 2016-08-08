'use strict';
module.exports = (function() {
    const Promise = require('bluebird')
    const Rooms = require('../data/rooms')
    const rooms = new Rooms().loadRooms()
    const store = require('../store')
    console.log('Locations excecuting!')

    return {
        getRoomDescription: getRoomDescription,
        roomsList: rooms
    }

    function getRoomDescription(hash) {
        let user = store.getState(hash)
        //DUMMY CODE WARNING BELOW
        let loc = 0
        return rooms[loc].getDescription()
          
    }
}());


