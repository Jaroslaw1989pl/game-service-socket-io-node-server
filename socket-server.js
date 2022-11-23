// build-in modules
var http = require('http');
// 3rd party modules
var io = require('socket.io');
var PORT = 5000;
;
var players = [];
var httpServer = http.createServer(function (request, response) { });
var socketIo = io(httpServer, { cors: { origin: '*' } });
socketIo.on('connection', function (socket) {
    socket.on('player-add', function (player) {
        // check if an player bject implements an Player interface
        if ('socketId' in player && 'userId' in player && 'userName' in player) {
            var index = players.findIndex(function (element) { return element.userId === player.userId; });
            if (index < 0)
                players.push(player);
            else
                players[index] = player;
        }
    });
    socketIo.emit('player-list', players);
    // broadcasting event from server to clients
    // socket.broadcast.emit('player-list', players);
});
httpServer.listen(PORT, function () { return console.log('HTTP server listen on port ' + PORT); });
