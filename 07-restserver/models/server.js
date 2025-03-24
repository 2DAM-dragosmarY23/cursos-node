const express = require('express')
var cors = require('cors')



class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usersPath = '/api/users';


        //Middlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();
    }

    middlewares() {
        //Directorio público
        this.app.use(express.static('public'));

        //CORS
        this.app.use(cors());

        //Parseo y lectura del body
        this.app.use(express.json());


    }

    routes() {

        this.app.use(this.usersPath, require('../routes/user.routes'));

    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Servido corriendo en puerto', this.port);

        });
    }

}



module.exports = Server;
