const express = require('express');
app = express();
const http = require('http');
const server = http.createServer(app)
const socket = require('socket.io')(server);

socket.on('connection', function(socket){

    socket.on('offer', function(description){
        socket.broadcast.emit('offer', description);
        console.log('offer Sent');
    });

    socket.on('candidate', function(candidate){
        socket.broadcast.emit('candidate', candidate);
        console.log('Candidate sent');
    });

    socket.on('answer', function(answer){
        socket.broadcast.emit('answer', answer);
        console.log('Answer Sent');
    });

    socket.on('ready',function(){
        socket.broadcast.emit('ready');
        console.log('Ready')
    });

});


app.use(express.static(__dirname + '/public'));


app.get('/communityworker', function(req, res){
    res.sendFile(__dirname + '/public/communityworker.html');
});

app.get('/hospital', function(req, res){
    res.sendFile(__dirname + '/public/hospital.html');
});

app.get('*', function(req, res){
    res.sendFile(__dirname + '/index.html');
});


server.listen(3000, function(){
    console.log('listening on port 3000')
});
