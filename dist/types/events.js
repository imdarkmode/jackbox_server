"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientEvents = exports.serverEvents = void 0;
// events emitted by the server that the client listens for
let serverEvents = {
    "roomUpdate": "roomUpdate",
    "usernameTaken": "usernameTaken",
    "connected": "connected",
    "gameStart": "gameStart",
    "error": "error",
};
exports.serverEvents = serverEvents;
// events emitted by the client that the server listens for
let clientEvents = {
    "createGame": "createGame",
    "joinGame": "joinGame",
    "startGame": "startGame",
    "leaveGame": "leaveGame",
};
exports.clientEvents = clientEvents;
