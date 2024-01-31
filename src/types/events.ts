// events emitted by the server that the client listens for
let serverEvents = {
  "roomUpdate": "roomUpdate",
  "usernameTaken": "usernameTaken",
  "connected": "connected",
  "gameStart": "gameStart",
  "error": "error",
}

// events emitted by the client that the server listens for
let clientEvents = {
  "createGame": "createGame",
  "joinGame": "joinGame",
  "startGame": "startGame",
  "leaveGame": "leaveGame",
}

export {
  serverEvents,
  clientEvents
}