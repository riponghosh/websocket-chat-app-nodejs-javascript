const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', function connection(ws) {
	ws.on('message', function incoming(event) {
		let json=JSON.parse(event);
		if (json.type=="name") {
			ws.userName=json.data;
			return;
		}
		wss.clients.forEach(function(client){
			if (client!=ws) {
				client.send(ws.userName+': '+json.data);
			}
		})
	});
});