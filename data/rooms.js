'use strict';

const Rooms = function() {
    this.roomList = {}
    return this
}
Rooms.prototype.getRoomList = function() {
    return this.roomList
}
Rooms.prototype.loadRooms = function() {
    var json = require('../data/teal.json')
    for (var key in json) {
        if (json.hasOwnProperty(key)) {
            let item = json[key]
            let room = new Room(item.id, item.name, item.description, item.exits, item.items, item.isQuitRoom)
            this.roomList[item.id] = room

        }
    }

    console.log('The rooms were just loaded!')
    return this.roomList
}


/**
 * Room Constructor
 * @param {int}  id         Room ID
 * @param {string}  name       Player visible room name
 * @param {string}  description       Room description
 * @param {array}  exits      Objects containing direction and room id
 * @param {array}  items      List of items in room
 * @param {boolean} isQuitRoom Exit game upon entry
 */
const Room = function(id, name, desc, exits, items, isQuitRoom) {
    const self = this

    self.id = id
    self.name = name
    self.description = desc
    self.exits = exits || []
    self.items = items || []
    self.isQuitRoom = isQuitRoom || false

}
Room.prototype.getID = function() {
    return this.id
}
Room.prototype.getName = function() {
    return this.name
}
Room.prototype.getDescription = function() {
    return this.description
}
Room.prototype.getDescription = function() {
    return this.exits
}
Room.prototype.getItems = function() {
    return this.items
}
Room.prototype.removeItem = function(item) { delete this.items[item] }
Room.prototype.addItem = function(item) { this.items.push(item) }

module.exports = Rooms
