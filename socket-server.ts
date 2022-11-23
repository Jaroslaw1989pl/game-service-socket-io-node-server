// build-in modules
const http = require('http');
// 3rd party modules
const io = require('socket.io');

const PORT = 5000;

interface Player {
  socketId: string;
  userId: string;
  userName: string;
};
let players: Player[] = [];


const httpServer = http.createServer((request, response): void => {/* ... */});
const socketIo = io(httpServer, {cors: {origin: '*'}});

socketIo.on('connection', (socket): void => {
  
  socket.on('player-add', (player: Player): void => {
    // check if an player bject implements an Player interface
    if ('socketId' in player && 'userId' in player && 'userName' in player) {
      const index = players.findIndex(element => element.userId === player.userId);
  
      if (index < 0) players.push(player);
      else players[index] = player;
      
      socketIo.emit('player-list', players);
    }
  });
  
  // broadcasting event from server to clients
  // socket.broadcast.emit('player-list', players);
});

httpServer.listen(PORT, () => console.log('HTTP server listen on port ' + PORT));