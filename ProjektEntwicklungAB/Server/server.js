//import required module
var express = require('express');
//instantiate
var app = express();
//build our restful service
app.get('/', function (req, res) {
   res.end('Hello World');
});
//TESTDATEN
var question1 = new Object();
question1={
	'id': 1,
    'leftPicture': "linkes Bild",
    'rightPicture': "rechtes Bild",
    'question': "Frage"
}
var question2 = new Object();
question2={
	'id': 2,
    'leftPicture': "URL linkes Bild2",
    'rightPicture': "URL rechtes Bild2",
    'question': "Frage2"
}
var project=new Object();
project = {
    'title': "ProjektEntwicklung",
    'description': "Dies ist ein Projekt der Medieninformatik Master", 
    'question': [question1, question2]
 }
//start server
app.get('/', function (req, res) {
   res.end('Hello World');
});

app.get('/project', function (req, res) {
    console.log("GET PROJECT aufgerufen");
  res.send(project);
});
var server = app.listen(3000, function () {
  console.log("Server is listening at http://127.0.0.1:3000/")
});    