const express = require('express')
const app = express()

app.use(express.json());

app.post('/', (req, res) => {
	//res.send('Hello World!');
	 console.log('I reciverd the request');
	     console.log('request query' + req.query);

	     console.log('Data from req body: '+ req.body.requestKey); // your JSON


})

app.listen(8080, () => console.log('Server listening on port 8080!'))