// Referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');




const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;

divAlert.style.display = 'none';

const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');

    btnAtender.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnAtender.disabled = true;
});

socket.on('last-ticket', (last) => {
    // lblNuevoTicket.innerText = 'Ultimo Ticket: ' + last;

})



btnAtender.addEventListener('click', () => {
    socket.emit('attend-ticket', { escritorio }, ({ ok, ticket, msg }) => {
        if (!ok) {
            lblTicket.innerText = 'Nadie.';
            divAlert.style.display = '';
            return; // Detenemos la ejecución si no hay tickets
        }

        lblTicket.innerText = 'Ticket ' + ticket.number;
        divAlert.style.display = 'none'; // Ocultamos la alerta si hay un ticket
    });
});