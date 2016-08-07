'use strict';
const Promise = require('bluebird')
const Rooms = require('../data/rooms')
let rooms = new Rooms().loadRooms()
const store = require('../store')

function Location(){
    return {
    	getRoomDescription: getRoomDescription,
    	roomsList: rooms
    }

    function getRoomDescription(hash) {
        let user = store.getState[hash]
        console.log(user)
        let loc = 0
            // this seems smelly, don't know if I should trust using the vnum as the lookup here
        return Promise.resolve()
            .then(function() {
                return rooms[loc].getRoomDescription
            })
    }


    }

module.exports = Location
