const path = require('path');
const fs = require('fs');


class Ticket {
    constructor(number, desk) {
        this.number = number;
        this.desk = desk; // El escritorio al que se asigna el ticket
    }
}

class TicketControl {

    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFour = [];

        this.init();
    }

    //Sirve para guardar el json en el archivo
    get toJson() {
        return {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastFour: this.lastFour
        }
    }

    //Se ejecuta al iniciar el servidor
    init() {
        const { today, tickets, lastFour } = require('../db/data.json');
        if (today === this.today) {
            this.tickets = tickets;
            this.lastFour = lastFour;
        } else {
            this.saveDB();
        }
    }


    saveDB() {
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }

    nextTicket() {
        this.last += 1;
        const ticket = new Ticket(this.last, null); // Crea un nuevo ticket con el número actual y sin escritorio asignado
        this.tickets.push(ticket);
        this.saveDB();

        return `Ticket ${ticket.number}`;
    }

    attendTicket(desk) {
        // No hay tickets que atender
        if (this.tickets.length === 0) {
            return null; // Devuelve null si no hay tickets disponibles
        }
    
        const ticket = this.tickets.shift(); // Saca el primer ticket de la lista
        ticket.desk = desk; // Asigna el escritorio al ticket
    
        this.lastFour.unshift(ticket); // Agrega el ticket a los últimos 4 atendidos
    
        if (this.lastFour.length > 4) {
            this.lastFour.splice(-1, 1); // Elimina el último ticket si hay más de 4
        }
    
        this.saveDB(); // Guarda los cambios en el archivo JSON
        return ticket; // Devuelve el ticket atendido
    }


}


module.exports = TicketControl;