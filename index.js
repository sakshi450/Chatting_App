const io = require('socket.io')(8000, {cors: {origin: "*"}});

const users = {};

io.on('connection', socket=>{
    socket.on('new-user-joined',name=>{
        console.log("New user joined ",name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message=>{
        if (message && message.trim().length > 0)
            socket.broadcast.emit('receive',{message: message, name: users[socket.id]});
    }); 

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    }); 
});