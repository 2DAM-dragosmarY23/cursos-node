const { default: axios } = require("axios");


class Search {

    history = ['Tegucigalpa', 'Madrid', 'San José'];


    constructor() {
        // TODO: leer DB si existe

    }

    async cities(place = '') {

        try {
            //peticion http
            // console.log('Ciudad', place);


            const resp = await axios.get('https://reqres.in/api/users?page=2');
            console.log(resp.data);

            return [];
        } catch (error) {
            return [];
        }



        return []; //retornar los lugares


    }

}


module.exports = Search;
