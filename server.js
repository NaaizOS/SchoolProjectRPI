/*
How to run:
Bash terminal command:
node server.js

vervolgens doet deze pagina het:
https://roomtopia-emielpopelier.c9users.io/
*/
var http            = require('http');
var express         = require('express');
var app             = express();
var serverHttp      = http.createServer(app);
var serverH         = serverHttp.listen(process.env.PORT);
var io              = require('socket.io').listen(serverH);

var mysql           = require('mysql');

var sqlConfig       = {
  host: "127.0.0.1",
  user: 'emielpopelier',
  //password: 'password',
  database: 'roomtopia'
}

console.log('Site running on https://roomtopia-emielpopelier.c9users.io/');
getAllFrom("Ruimte");

app.use(express.static('assets'));


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('established', "You are connected to the socket.io server.");
  var liveData = {
  temperatuur: 50,
  luchtdruk: 50,
  hoogtepunt: 50
}
socket.emit('liveData', liveData);
for(var i=0;i<11;i++){
liveData = {
  temperatuur: Math.floor(Math.random() * 40),
  luchtdruk: Math.floor(Math.random() * 100),
  hoogtepunt: Math.floor(Math.random() * 100)
}
  socket.emit('liveData', liveData);
}
});


function getAllFrom(database){
  let connection = mysql.createConnection(sqlConfig);
  let stmt = "SELECT * FROM " + database;
  let todo = ['Getting current date.', false];

  connection.query(stmt, todo, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    console.log(results[0]);
  });
  connection.end();
}