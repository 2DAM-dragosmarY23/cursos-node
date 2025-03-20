require('dotenv').config()

const clear = require('clear');
const axios = require('axios');

const { readInput,
    inquireMenu,
    pause,
    listPlaces } = require('./helpers/inquirer');
const Search = require('./models/search');


clear();

const main = async () => {


    const search = new Search();
    let opt;

    do {

        opt = await inquireMenu();

        switch (opt) {
            case 1:
                //Mostrar mensaje
                const item_search = await readInput('Buscar Ciudad: ');

                //Buscar los lugares
                const places = await search.cities(item_search);

                //seleccionar el lugar
                const id = await listPlaces(places);
                if (id === '0') continue;
                
                
                const placeSel = places.find(p => p.id === id);
                
                //Guardar en DB
                search.addHistory(placeSel.name);
                
                //Clima
                const weather = await search.weatherPlace(placeSel.lat, placeSel.lng)
                

                //Mostrar resultados
                clear();
                console.log('\nInformación de la ciudad\n'.cyan);
                console.log('Ciudad:', placeSel.name.magenta);
                console.log('Lat:', placeSel.lat);
                console.log('Lng:', placeSel.lng);
                console.log('Temperatura:', weather.temp, 'ºC'.yellow);
                console.log('Mínima:', weather.min);
                console.log('Máxima:', weather.max);
                console.log('Como esta el clima:', weather.desc.magenta);

                break;
            case 2:


                search.capitalizedHistory.forEach((place, i) => {
                    const idx = `${i + 1}`.cyan;
                    console.log(`${idx} ${place}`);

                })


                break;
            case 0:

                break;
        }

        if (opt !== 0) await pause();




    } while (opt !== 0);



}

main();





