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
var i=0, j=0;
const io = socketIo(server);
let sockets = new Set();

var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();
var btSerial2 = new (require('bluetooth-serial-port')).BluetoothSerialPort();

var address= '4C-EF-C0-EE-96-FB';
var address2 = '00-71-47-76-66-0C';

io.on('connection', (socket)=>{
	//Öffne die Connection
	console.log(socket.id + "Connection vorhanden++++++++++++++++++++");
	sockets.add(socket);
//Sockets Disconnected, dann auch Verbindung zum Device beenden um später wieder zu verbinden
socket.on('disconnect', function(){
	console.log( socket.id + ' has disconnected from the chat. ');
	btSerial.close();
	sockets.delete(socket);
});
    //BUTTON 1 
    
	btSerial.findSerialPortChannel(address, function(channel) {
		btSerial.connect(address, channel, function() {
			console.log('> button one is connected using ' + address);
			btSerial.on('data', function(buffer) {
				var isPressed=false;
				console.log('> receiving ('+buffer.length+' bytes):', buffer);
				
				isPressed = buffer[buffer.length-2] == 0xc6;
				console.log(isPressed);
				if(isPressed){
				console.log(' >> button 1 is PRESSED');
				
				socket.emit('message', {
						"pressedButton": '1',
						"numbers": i
						});
                    console.log(socket.id + " NACHRICHT AN " + i);
                    i++;
				}
		}, function () {
			console.log('> cannot connect 1' );
		});
	}, function() {
		console.log('found nothing');
	});
	});
    
    //Button 2
    	btSerial2.findSerialPortChannel(address2, function(channel) {
		btSerial2.connect(address2, channel, function() {
			console.log('> button 2 is connected using ' + address2);
			btSerial2.on('data', function(buffer) {
				var isPressed=false;
				console.log('> receiving ('+buffer.length+' bytes):', buffer);
				
				isPressed = buffer[buffer.length-2] == 0xce;
				console.log(isPressed);
				if(isPressed){
				console.log(' >> button 2 is pressed');
				
				socket.emit('message', {
						"pressedButton": '2',
						"numbers": j
						});
                    console.log(socket.id + " NACHRICHT AN " + j);
                    j++;
				}
		}, function () {
			console.log('> cannot connect 2' );
		});
	}, function() {
		console.log('found nothing');
	});
	});
	
});
process.on('SIGINT', function() {
	console.log("> closing bluetooth connection.");
	btSerial.close();
    btSerial2.close();
	process.exit();
});

