"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = exports.Rooms = void 0;
class Rooms {
    constructor() {
        this.rooms = [];
    }
    addRoomWithID(id, gameType) {
        this.rooms.push(new Room(id, gameType));
        return this.getRoom(id);
    }
    removeRoom(room) {
        this.rooms = this.rooms.filter((r) => r.getID() !== room.getID());
    }
    removeRoomWithID(id) {
        this.rooms = this.rooms.filter((r) => r.getID() !== id);
    }
    getRoom(id) {
        return this.rooms.find((r) => r.getID() === id);
    }
    getRooms() {
        return this.rooms;
    }
}
exports.Rooms = Rooms;
class Room {
    constructor(id, gameType) {
        this.id = id;
        this.players = [];
        this.gameType = gameType;
    }
    addPlayer(player) {
        this.players.push(player);
    }
    removePlayer(player) {
        this.players = this.players.filter((p) => p !== player);
    }
    getPlayers() {
        return this.players;
    }
    hasUsername(username) {
        return this.players.includes(username);
    }
    setGameType(gameType) {
        this.gameType = gameType;
    }
    getGameType() {
        return this.gameType;
    }
    getID() {
        return this.id;
    }
}
exports.Room = Room;
