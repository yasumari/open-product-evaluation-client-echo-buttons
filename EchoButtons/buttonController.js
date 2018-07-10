const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();

var request = require('request');

app.get('/', (req, res) => res.send("Hello World"));

const server  = http.Server(app);


server.listen(3001);
console.log("HÖRT AUF PORT 3001");
////////////Button 1

const io = socketIo(server);
	
var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();
var address= '4C-EF-C0-EE-96-FB';
io.on('connection', (socket)=>{
	

btSerial.findSerialPortChannel(address, function(channel) {
	btSerial.connect(address, channel, function() {
		console.log('> button one is connected using ' + address);
		btSerial.on('data', function(buffer) {
			console.log('> receiving ('+buffer.length+' bytes):', buffer);

			var isPressed = buffer[buffer.length-2] == 0xc6;
			console.log("Gedrückt: " + buffer[buffer.length-2]);
			if(isPressed){
			 console.log(' >> button 1 is ' + 'pressed');

			 socket.emit('message', {
			 		pressedButton: '1'
			 		});

			}else{
			 console.log(' >> button 1 is ' + 'released');
			}

		});

	}, function () {
		console.log('> cannot connect 1' );
	});

}, function() {
	console.log('found nothing');
});


process.on('SIGINT', function() {
	console.log("> closing bluetooth connection.");
	btSerial.close();
	process.exit();
});



//////////////////////Button 2

/*
Hier auskommentiert: 
var btSerial2 = new (require('bluetooth-serial-port')).BluetoothSerialPort();

var address2 = '00-71-47-76-66-0C';

btSerial2.findSerialPortChannel(address2, function(channel) {
	btSerial2.connect(address2, channel, function() {
		console.log('> button two is connected using ' + address2);
		btSerial2.on('data', function(buffer) {
			console.log('> receiving ('+buffer.length+' bytes):', buffer);

			var isPressed = buffer[buffer.length-2] == 0xce;
			if(isPressed){

			 console.log(' >> button 2 is ' + 'pressed');

			 io.on('connection', (socket) => {
			 	socket.emit('message', {
			 		pressedButton: '2'
			 		});
			 });
					


			}else{
			 console.log(' >> button 2 is ' + 'released');
			}
		});

	}, function () {
		console.log('> cannot connect 2');
	});

}, function() {
	console.log('found nothing');
});


process.on('SIGINT', function() {
	console.log("> closing bluetooth connection.");
	btSerial2.close();
	process.exit();
});

////////////// button three


var btSerial3 = new (require('bluetooth-serial-port')).BluetoothSerialPort();

var address3 = '50-DC-E7-DF-20-0B';

btSerial3.findSerialPortChannel(address3, function(channel) {
	btSerial3.connect(address3, channel, function() {
		console.log('> button four is connected using ' + address3);
		btSerial3.on('data', function(buffer) {
			console.log('> receiving ('+buffer.length+' bytes):', buffer);

			var isPressed = buffer[buffer.length-2] == 0xc3;
			if(isPressed){
			 console.log(' >> button 3 is ' + 'pressed');


			 io.on('connection', (socket) => {
			 	socket.emit('message', {
			 		pressedButton: '3'
			 		});
			 });

				
				

			}else{
			 console.log(' >> button 3 is ' + 'released');
			}
		});

	}, function () {
		console.log('> cannot connect 3');
	});

}, function() {
	console.log('found nothing');
});


process.on('SIGINT', function() {
	console.log("> closing bluetooth connection.");
	btSerial3.close();
	process.exit();
});



///////////////// button 4



var btSerial4 = new (require('bluetooth-serial-port')).BluetoothSerialPort();

var address4 = '50-DC-E7-4D-F1-E6';

btSerial4.findSerialPortChannel(address4, function(channel) {
	btSerial4.connect(address4, channel, function() {
		console.log('> button three is connected using ' + address4);
		btSerial4.on('data', function(buffer) {
			console.log('> receiving ('+buffer.length+' bytes):', buffer);

			var isPressed = buffer[buffer.length-2] == 0xba;
	if(isPressed){
			 console.log(' >> button 4 is ' + 'pressed');

			  io.on('connection', (socket) => {
			 	socket.emit('message', {
			 		pressedButton: '4'
			 		});
			 });
				

			}else{
			 console.log(' >> button 4 is ' + 'released');
			}
		});

	}, function () {
		console.log('> cannot connect 4');
	});

}, function() {
	console.log('found nothing');
});

*/
process.on('SIGINT', function() {
	console.log("> closing bluetooth connection.");
	btSerial.close();
//btSerial2.close();
	//btSerial3.close();
	//btSerial4.close();
	process.exit();
});
});
