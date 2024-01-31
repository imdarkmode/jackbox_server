"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const rooms_1 = require("../utils/rooms");
const common_1 = require("../utils/common");
const events_1 = require("../types/events");
const Errors = __importStar(require("../types/errors"));
require("dotenv/config");
let roomid = 1;
const rooms = new rooms_1.Rooms();
class EventHandler {
    static createGame(io, socket, request) {
        try {
            // create new room
            if (!request.username)
                throw Errors.USER_NOT_DEFINED;
            (0, common_1.print)(`User ${request.username} created new room ${roomid}`);
            socket.join(roomid + '');
            // update rooms object
            const room = rooms.addRoomWithID(roomid + '', request.gameType);
            room === null || room === void 0 ? void 0 : room.addPlayer(request.username);
            room === null || room === void 0 ? void 0 : room.setGameType(request.gameType);
            socket.emit(events_1.serverEvents.connected); // inform client of successful connection
            if (room)
                this.emitRoomUpdate(io, room); // send initial room update
            // increment roomid
            roomid += 1;
        }
        catch (e) {
            (0, common_1.print)(e.message);
            socket.emit(events_1.serverEvents.error, e.message);
        }
    }
    static joinGame(io, socket, request) {
        try {
            if (!io.sockets.adapter.rooms.get(request.gameid))
                throw Errors.INVALID_GAMEID;
            if (!request.username)
                throw Errors.USER_NOT_DEFINED;
            let username = request.username;
            const room = rooms.getRoom(request.gameid);
            if (room === null || room === void 0 ? void 0 : room.hasUsername(request.username)) {
                (0, common_1.print)('Username taken');
                username += '2';
                socket.emit(events_1.serverEvents.usernameTaken, username);
            } // Username taken, append _1
            (0, common_1.print)(`User ${username} joined room ${request.gameid}`);
            socket.join(request.gameid); // add user to room
            room === null || room === void 0 ? void 0 : room.addPlayer(username); // add user to room object
            socket.emit(events_1.serverEvents.connected); // inform client of successful connection
            if (room)
                this.emitRoomUpdate(io, room); // send room update to all clients in room
        }
        catch (e) {
            (0, common_1.print)(e.message);
            socket.emit(events_1.serverEvents.error, e.message);
        }
    }
    static startGame(io, socket, request) {
        try {
            io.in(request.gameid).emit(events_1.serverEvents.gameStart);
        }
        catch (e) {
            (0, common_1.print)(e.message);
            socket.emit(events_1.serverEvents.error, e.message);
        }
    }
    static leaveGame(io, socket, request) {
        try {
            (0, common_1.print)(`User ${request.username} left room ${request.gameid}`);
            socket.leave(request.gameid);
            const room = rooms.getRoom(request.gameid);
            room === null || room === void 0 ? void 0 : room.removePlayer(request.username);
            if (room)
                this.emitRoomUpdate(io, room);
        }
        catch (e) {
            (0, common_1.print)(e.message);
            socket.emit(events_1.serverEvents.error, e.message);
        }
    }
    static emitRoomUpdate(io, room) {
        // emit updates
        io.in(room.getID()).emit(events_1.serverEvents.roomUpdate, {
            gameid: room.getID() + '',
            players: room === null || room === void 0 ? void 0 : room.getPlayers(),
            gameType: room === null || room === void 0 ? void 0 : room.getGameType()
        });
    }
}
exports.default = EventHandler;
