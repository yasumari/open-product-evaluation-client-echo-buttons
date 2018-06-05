var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();

var address = '00-71-47-76-66-0C';

btSerial.findSerialPortChannel(address, function(channel) {
	btSerial.connect(address, channel, function() {
		console.log('> connected to ' + address);
		btSerial.on('data', function(buffer) {
			console.log('> receiving ('+buffer.length+' bytes):', buffer);

			var isPressed = buffer[buffer.length-2] == 0xce;
			console.log(' >> button is ' + (isPressed?'pressed':'released'));
		});

	}, function () {
		console.log('> cannot connect');
	});

}, function() {
	console.log('found nothing');
});


process.on('SIGINT', function() {
	console.log("> closing bluetooth connection.");
	btSerial.close();
	process.exit();
});



