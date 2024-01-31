"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const common_1 = require("./utils/common");
require("dotenv/config");
const events_1 = require("./types/events");
const eventHandler_1 = __importDefault(require("./utils/eventHandler"));
const app = (0, express_1.default)(); // create express app
const httpServer = (0, http_1.createServer)(app); // create http server
const port = process.env.PORT || 3000; // port to listen on
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_ORIGIN
    }
});
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
io.on("connection", (socket) => {
    (0, common_1.print)('New Connection');
    // Create new game
    socket.on(events_1.clientEvents.createGame, (request) => eventHandler_1.default.createGame(io, socket, request));
    // Join game
    socket.on(events_1.clientEvents.joinGame, (request) => eventHandler_1.default.joinGame(io, socket, request));
    // Start game
    socket.on(events_1.clientEvents.startGame, (request) => eventHandler_1.default.startGame(io, socket, request));
    // Leave game
    socket.on(events_1.clientEvents.leaveGame, (request) => eventHandler_1.default.leaveGame(io, socket, request));
});
httpServer.listen(port);
console.log(`listening on port ${port}`);
