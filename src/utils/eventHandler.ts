import { Socket, Server } from "socket.io";
import * as IClient from "../types/IClient";
import * as IServer from "../types/IServer";
import { Rooms, Room } from "../utils/rooms";
import { print } from "../utils/common";
import { serverEvents, clientEvents } from '../types/events';
import * as Errors from '../types/errors';
import 'dotenv/config'
import { server } from "typescript";

let roomid = 1;
const rooms = new Rooms();

export default class EventHandler {

  static createGame(io: Server, socket: Socket, request: IClient.ICreateGame) {
    try {
      // create new room
      if (!request.username) throw Errors.USER_NOT_DEFINED;
      print(`User ${request.username} created new room ${roomid}`)
      socket.join(roomid + '');

      // update rooms object
      const room = rooms.addRoomWithID(roomid + '', request.gameType);
      room?.addPlayer(request.username);
      room?.setGameType(request.gameType);

      socket.emit(serverEvents.connected) // inform client of successful connection
      if (room) this.emitRoomUpdate(io, room) // send initial room update

      // increment roomid
      roomid += 1;
    } catch (e: any) {
      print(e.message)
      socket.emit(serverEvents.error, e.message)
    }

  }

  static joinGame(io: Server, socket: Socket, request: IClient.IJoinGame) {
    try {
      if (!io.sockets.adapter.rooms.get(request.gameid)) throw Errors.INVALID_GAMEID;
      if (!request.username) throw Errors.USER_NOT_DEFINED;

      let username = request.username;
      const room = rooms.getRoom(request.gameid)

      if (room?.hasUsername(request.username)) {
        print('Username taken')
        username += '2'
        socket.emit(serverEvents.usernameTaken, username)
      } // Username taken, append _1
      print(`User ${username} joined room ${request.gameid}`)
      socket.join(request.gameid) // add user to room
      room?.addPlayer(username); // add user to room object

      socket.emit(serverEvents.connected) // inform client of successful connection
      if (room) this.emitRoomUpdate(io, room) // send room update to all clients in room
    } catch (e: any) {
      print(e.message)
      socket.emit(serverEvents.error, e.message)
    }
  }

  static startGame(io: Server, socket: Socket, request: IClient.IStartGame) {
    try {
      io.in(request.gameid).emit(serverEvents.gameStart)
    } catch (e: any) {
      print(e.message)
      socket.emit(serverEvents.error, e.message)
    }
  }

  static leaveGame(io: Server, socket: Socket, request: IClient.ILeaveGame) {
    try {
      print(`User ${request.username} left room ${request.gameid}`)
      socket.leave(request.gameid);
      const room = rooms.getRoom(request.gameid)
      room?.removePlayer(request.username);
      if (room) this.emitRoomUpdate(io, room)
    } catch (e: any) {
      print(e.message)
      socket.emit(serverEvents.error, e.message)
    }
  }

  private static emitRoomUpdate(io: Server, room: Room) {
    // emit updates
    io.in(room.getID()).emit(serverEvents.roomUpdate, {
      gameid: room.getID() + '',
      players: room?.getPlayers(),
      gameType: room?.getGameType()
    } as IServer.IRoomUpdate)
  }
}

