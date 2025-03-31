const express = require('express')
var cors = require('cors');
const { dbConnection } = require('../database/config');



class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            categories: '/api/categories',
            users: '/api/users'
        }


        //Conectar a base de datos
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();
    }

    async connectDB(){
        await dbConnection();
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

        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.categories, require('../routes/categories.routes'));
        this.app.use(this.paths.users, require('../routes/user.routes'));

    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Servido corriendo en puerto', this.port);

        });
    }

}



module.exports = Server;