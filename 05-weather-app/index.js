const clear = require('clear');
const axios = require('axios');

const { readInput,
    inquireMenu,
    pause } = require('./helpers/inquirer');
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
                const place = await readInput('Buscar Ciudad: ');
                // console.log(place);
                await search.cities(place);
                //Buscar los lugares

                //seleccionar el lugar

                //Clima

                //Mostrar resultados
                console.log('\nInformación de la ciudad\n'.cyan);
                console.log('Ciudad:',);
                console.log('Lat:',);
                console.log('Lng:',);
                console.log('Temperatura:',);
                console.log('Mínima:',);
                console.log('Máxima:',);

                break;
            case 2:

                break;
            case 0:

                break;
        }

        if (opt !== 0) await pause();




    } while (opt !== 0);



}

main();





