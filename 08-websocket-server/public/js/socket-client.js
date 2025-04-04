
//Referencias del HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend = document.querySelector('#btnSend');




const socket =io();


// Conectar al servidor de Socket.io
socket.on('connect', () => {
    // console.log('Conectado al servidor de Socket.io');

    // Cambiar el estado de los labels al conectarse
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});


// Desconectar del servidor de Socket.io
socket.on('disconnect', () => {
    console.log('Desconectado del servidor de Socket.io');

    // Cambiar el estado de los labels al desconectarse
    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
});

// Escuchar el evento 'enviar-mensaje' del servidor
socket.on('enviar-mensaje', (payload) => {
    console.log('Mensaje recibido:', payload);
    // Aquí puedo manejar el mensaje recibido del servidor
    // Por ejemplo, mostrarlo en la interfaz de usuario
});

// Escuchar el evento 'enviar-mensaje' del servidor
btnSend.addEventListener('click', () => {
    const message = txtMessage.value;

    //Es lo que se va a enviar al servidor
    const payload = {
        message,
        id: '123456',
        date: new Date().getTime()
    };

    //Es para emitir/enviar un evento al servidor
    socket.emit('enviar-mensaje', payload, (id) => {
        console.log('Desde el server', id);
        
    } );
    
});