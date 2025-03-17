require('colors');
const clear = require('clear');
const inquirer = require('inquirer');
const { inquireMenu } = require('./helpers/inquirer');

// const { mostrarMenu, pausa } = require('./helpers/mensajes');


clear();

const main = async () => {
    console.log('Hola Mundo');
    let opt = '';


    do {
        opt = await inquireMenu();
        console.log({ opt });

    } while (opt !== '0');



    // pausa();
}

main();



