const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();

//var request = require('request');
var clients = {};

app.get('/', (req, res) => res.send("Hello World"));

const server  = http.Server(app);


server.listen(3001);
console.log("HÖRT AUF PORT 3001");
////////////Button 1
var i=0;
const io = socketIo(server);
	
var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();
var address= '4C-EF-C0-EE-96-FB';

io.on('connection', (socket)=>{
	//Öffne die Connection
	console.log(socket.id + "Connection vorhanden++++++++++++++++++++");
	clients[socket.id] = socket;

//Sockets Disconnected, dann auch Verbindung zum Device beenden um später wieder zu verbinden
socket.on('disconnect', function(){
	console.log( socket.id + ' has disconnected from the chat. ');
	delete clients[socket.id];
	btSerial.close();
});
	btSerial.findSerialPortChannel(address, function(channel) {
		btSerial.connect(address, channel, function() {
			console.log('> button one is connected using ' + address);
			btSerial.on('data', function(buffer) {
				var isPressed=false;
				console.log('> receiving ('+buffer.length+' bytes):', buffer);
				
				isPressed = buffer[buffer.length-2] == 0xc6;
				console.log(isPressed);
				if(isPressed){
				console.log(' >> button 1 is pressed');
				console.log(socket.id + "     NACHRICHT AN ");
				socket.emit('message', {
						pressedButton: '1',
						numbers: i++
						});
				}else {
					console.log(' >> button1 is released');
				}
		}, function () {
			console.log('> cannot connect 1' );
		});
	}, function() {
		console.log('found nothing');
	});
	});
	
});
process.on('SIGINT', function() {
	console.log("> closing bluetooth connection.");
	btSerial.close();
	process.exit();
});

