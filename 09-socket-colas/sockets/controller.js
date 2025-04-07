

const TicketControl = require('../models/ticket-control');
const ticketControl = new TicketControl();

const socketController = (socket) => {
    
    socket.emit('last-ticket', ticketControl.last); // Envia el último ticket al cliente
    socket.emit('status-actual', ticketControl.lastFour); // Envia el estado actual de los últimos 4 tickets al cliente
    
    socket.on('next-ticket', ( payload, callback ) => {
        
        const next = ticketControl.nextTicket();
        callback(next); // Envia el ticket al cliente
        
        //TODO: Notificar que hay un nuevo ticket pendiente
        
        
    })
    
    socket.on('attend-ticket', ({ escritorio }, callback) => {
        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }
        
        const ticket = ticketControl.attendTicket(escritorio);
        
        socket.broadcast.emit('status-actual', ticketControl.lastFour);

        if (!ticket) {
            return callback({
                ok: false,
                msg: 'No hay tickets pendientes'
            });
        }
    
        callback({
            ok: true,
            ticket
        });
    
        // TODO: Notificar el cambio en los últimos 4 tickets
    });



}



module.exports = {
    socketController
}

