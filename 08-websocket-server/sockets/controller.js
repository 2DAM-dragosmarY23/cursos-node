

const socketController = (socket) => {
            

    socket.on('disconnect', () => {

        console.log('Cliente conectado', socket.id);
        
        
        console.log('Cliente desconectado', socket.id);
    });

    //Escuchar el evento 'enviar-mensaje' del cliente y enviarlo a todos los clientes conectados
    socket.on('enviar-mensaje', (payload, callback) => {
        const id = 123456789;
        callback(id); // Callback para enviar el id al cliente

        socket.broadcast.emit('enviar-mensaje', payload);
    });
    
}


module.exports = {
    socketController
}