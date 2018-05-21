//import required module
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
//instantiate
var app = express();

// parse application/json
app.use(bodyParser.json())

app.use(cors());
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
    'id': 1,
    'title': "ProjektEntwicklung",
    'description': "Dies ist ein Projekt der Medieninformatik Master", 
    'question': [question1, question2]
 }
var project2=new Object();
project2 = {
        'id': 2,
    'title': "ProjektE Zwei",
    'description': "Dies ist ein zweites Projekt der Medieninformatik Master", 
    'question': [question1, question2]
 }
var project3=new Object();
project3 = {
        'id': 3,
    'title': "Projekt Drei",
    'description': "Dies ist ein drittes Projekt der Medieninformatik Master", 
    'question': [question1, question2]
 }

var allProjects=[project, project2, project3];
//start server
app.get('/', function (req, res) {
   res.end('Hello World');
});

app.get('/projects', function (req, res) {
    console.log("GET /projects aufgerufen");
  res.send(allProjects);
});

app.get('/projects/:id', function (req, res) {
    console.log("GET /projects/:id aufgerufen");
    var projectID=req.params.id;
    var finaleProject={};
    for (var i=0; i<allProjects.length; i++){
        if (allProjects[i].id==projectID){
            finaleProject=allProjects[i];
        }
    }
    
  res.send(finaleProject);
});

app.delete('/projects/:id', function (req,res){
    console.log("DELETE /projects/:id aufgerufen");
    var msg="Erfolgreich: DELETE laut Server";
   console.log("Es wurde das Projekt mit der ID " + req.params.id+" gelöscht");
    res.send({"message":msg});
});

app.put('/projects/:id', function (req,res){
    console.log("PUT /projects/:id aufgerufen mit Body: " + JSON.stringify(req.body));
    var msg="Erfolgreich: PUT laut Server";
   console.log("Es wurde das Projekt mit der ID " + req.params.id+" aktualisiert");
    res.send({"message":msg});
});

app.post('/projects', function (req,res){
    console.log("POST /projects aufgerufen mit Body: " + JSON.stringify(req.body));
    var msg="Erfolgreich: POST laut Server";
   console.log("Es wurde das Projekt erstellt");
    res.send({"message":msg});
});


var server = app.listen(3000, function () {
  console.log("Server is listening at http://127.0.0.1:3000/")
});    