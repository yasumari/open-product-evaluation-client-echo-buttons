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

  //Button 0,1,2,3
  //       | | | |
  //Items  0,1,2,3

////////////Button 1
const io = socketIo(server);
let sockets = new Set();
let isConnected=false;
var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();
var btSerial2 = new (require('bluetooth-serial-port')).BluetoothSerialPort();
var btSerial3 = new (require('bluetooth-serial-port')).BluetoothSerialPort();
var btSerial4 = new (require('bluetooth-serial-port')).BluetoothSerialPort();

var address= '4C-EF-C0-EE-96-FB';
var address2 = '00-71-47-76-66-0C';
var address3  = '50-DC-E7-DF-20-0B';
var address4= '50-DC-E7-4D-F1-E6';

io.on('connection', (socket)=>{
	//Öffne die Connection
	console.log(socket.id + "Connection vorhanden++++++++++++++++++++");
	sockets.add(socket);
	isConnected=true;

//Sockets Disconnected, dann auch Verbindung zum Device beenden um später wieder zu verbinden
socket.on('disconnect', function(){
	console.log( socket.id + ' has disconnected from the chat. ');
	isConnected=false;
	btSerial.close();
	btSerial2.close();
	btSerial3.close();
	btSerial4.close();
	sockets.delete(socket);
	isConnected=false;
});
    //BUTTON 1 
    
	btSerial.findSerialPortChannel(address, function(channel) {
		btSerial.connect(address, channel, function() {
			console.log('> button one is connected using ' + address);
			btSerial.on('data', function(buffer) {
				var isPressed=false;
				//console.log('> receiving ('+buffer.length+' bytes):', buffer);
				
				isPressed = buffer[buffer.length-2] == 0xc6;
				console.log(isPressed);
				if(isPressed){
				console.log(' >> button 0 is PRESSED');
				if (isConnected){
					console.log("VERBUNDEN SCHICKE NACHRICHT")
					socket.emit('message', {
						"pressedButton": '0'
						});
                    console.log(socket.id + " NACHRICHT AN ");
				}else{
					console.log("-----Keine Nachricht, da nicht verbunden");
				} 
				}
		}, function () {
			console.log('> cannot connect 0' );
		});
	}, function() {
		console.log('button 0 not found');
	});
	});
    
    //Button 2
    btSerial2.findSerialPortChannel(address2, function(channel) {
		btSerial2.connect(address2, channel, function() {
			console.log('> button 1 is connected using ' + address2);
			btSerial2.on('data', function(buffer) {
				var isPressed=false;
				//console.log('> receiving ('+buffer.length+' bytes):', buffer);
				
				isPressed = buffer[buffer.length-2] == 0xce;
				console.log(isPressed);
				if(isPressed){
				console.log(' >> button 1 is pressed');
				
				socket.emit('message', {
						"pressedButton": '1'
						});
                    console.log(socket.id + " NACHRICHT AN ");
				}
		}, function () {
			console.log('> cannot connect 1' );
		});
	}, function() {
		console.log('button 1 not found');
	});
	});
	
	//Button 3
	btSerial3.findSerialPortChannel(address3, function(channel) {
		btSerial3.connect(address3, channel, function() {
			console.log('> button 2 is connected using ' + address3);
			btSerial3.on('data', function(buffer) {
				var isPressed=false;
				//console.log('> receiving ('+buffer.length+' bytes):', buffer);
				
				isPressed = buffer[buffer.length-2] == 0xce;
				console.log(isPressed);
				if(isPressed){
				console.log(' >> button 2 is pressed');
				
				socket.emit('message', {
						"pressedButton": '2'
						});
                    console.log(socket.id + " NACHRICHT AN " );
				}
		}, function () {
			console.log('> cannot connect 2' );
		});
	}, function() {
		console.log('button 2 not found');
	});
	});

	//Button 4
	btSerial4.findSerialPortChannel(address4, function(channel) {
		btSerial4.connect(address4, channel, function() {
			console.log('> button 3 is connected using ' + address4);
			btSerial4.on('data', function(buffer) {
				var isPressed=false;
				//console.log('> receiving ('+buffer.length+' bytes):', buffer);
			
				isPressed = buffer[buffer.length-2] == 0xce;
				console.log(isPressed);
				if(isPressed){
				console.log(' >> button 3 is pressed');
				
				socket.emit('message', {
						"pressedButton": '3'
						});
                    console.log(socket.id + " NACHRICHT AN ");
				}
		}, function () {
			console.log('> cannot connect 3' );
		});
	}, function() {
		console.log('button 3 not found');
	});
	});
});
process.on('SIGINT', function() {
	console.log("> closing bluetooth connection.");
	btSerial.close();
	btSerial2.close();
	btSerial3.close();
	btSerial4.close()
	process.exit();
});

