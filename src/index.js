(function() {
	"use strict";

	var net = require('net');

	var host = process.argv[2];
	var port = process.argv[3];

	var server = net.createServer(function(socket) {
		socket.write('Echo server\r\n');
		socket.pipe(socket);
	});

	app.listen(port);
	server.listen(port);
})();
