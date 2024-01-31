// these event interfaces are emitted by the client to the server

export interface ICreateGame {
  username: string
  gameType: string
}

export interface IJoinGame {
  username: string;
  gameid: string;
}

export interface IStartGame {
  gameid: string;
}

export interface ILeaveGame {
  username: string;
  gameid: string;
}