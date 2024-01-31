export class Rooms {
  private rooms: Room[];

  constructor() {
    this.rooms = [];
  }

  addRoomWithID(id: string, gameType: string) {
    this.rooms.push(new Room(id, gameType));
    return this.getRoom(id)
  }

  removeRoom(room: Room) {
    this.rooms = this.rooms.filter((r) => r.getID() !== room.getID());
  }

  removeRoomWithID(id: string) {
    this.rooms = this.rooms.filter((r) => r.getID() !== id);
  }

  getRoom(id: string) {
    return this.rooms.find((r) => r.getID() === id);
  }

  getRooms() {
    return this.rooms;
  }
}

export class Room {
  private id: string;
  private players: string[];
  private gameType: string;

  constructor(id: string, gameType: string) {
    this.id = id;
    this.players = [];
    this.gameType = gameType;
  }

  addPlayer(player: string) {
    this.players.push(player);
  }

  removePlayer(player: string) {
    this.players = this.players.filter((p) => p !== player);
  }

  getPlayers() {
    return this.players;
  }

  hasUsername(username: string) {
    return this.players.includes(username);
  }

  setGameType(gameType: string) {
    this.gameType = gameType;
  }

  getGameType() {
    return this.gameType;
  }

  getID() {
    return this.id;
  }
}