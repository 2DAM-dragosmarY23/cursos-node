const fs = require('fs');
const { default: axios } = require("axios");




class Search {

    history = [];
    dbPath = './database/database.json';


    constructor() {
        // TODO: leer DB si existe
        this.readDB();

    }

    get capitalizedHistory() {
        return this.history.map(place => {
            let words = place.split(' ');
            words = words.map(p => p[0].toUpperCase() + p.substring(1));
            return words.join(' ');
        });
    }

    async cities(place = '') {

        try {
            //peticion http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: {
                    'access_token': process.env.MAPBOX_KEY,
                    'language': 'es'
                }
            });


            const resp = await instance.get();
            return resp.data.features.map(place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]

            }));

        } catch (error) {
            return [];
        }


    }

    get paramsWeatherMap() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    async weatherPlace(lat, lon) {
        try {
            // instance axios.create()
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsWeatherMap, lat, lon }
            });


            //respuesta resp.data
            const resp = await instance.get();
            const { weather, main } = resp.data
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            };
        }
        catch (error) {
            console.log(error);

        }
    }

    addHistory(place = '') {

        if (this.history.includes(place.toLocaleLowerCase())) {
            return;
        }

        this.history.unshift(place.toLocaleLowerCase());

        //Grabar en BD
        this.saveDB();

    }

    saveDB() {

        const payload = {
            history: this.history
        };

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));

    }


    //Función para cargar el historial
    readDB() {

        if (!fs.existsSync(this.dbPath)) {
            return;
        }

        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        const dataDB = JSON.parse(info);

        this.history = dataDB.history;
        }
}



module.exports = Search;

// const instance = axios.create({
//     baseURL: `https://api.mapbox.com/search/geocode/v6/forward`,
//     params: {
//         'access_token': 'pk.eyJ1IjoiZHJhZ29zMTgxMiIsImEiOiJjbThoNTV1djAwOXJsMm1wZ2VybXEwc3Z3In0.Ycanlxd9Uik8QvMXKhZn9Q',
//         'language' : 'es',
//         'q' : place
//     }
// });