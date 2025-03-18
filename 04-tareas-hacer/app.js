require('colors');
const clear = require('clear');
const inquirer = require('inquirer');
const {
    inquireMenu,
    pause,
    readInput
} = require('./helpers/inquirer');

const Tasks = require('./models/tasks');
const { saveDB } = require('./helpers/saveFile.js');
const { readDB } = require('./helpers/readDB');

// const { mostrarMenu, pausa } = require('./helpers/mensajes');


clear();

const main = async () => {

    let opt = '';
    const tasks = new Tasks();

    //Aquí leo el data.json
    const tasksDB = readDB();

    if (tasksDB) { //cargar tareas
        
        tasks.loadTasksFromArray(tasksDB);

    }

    do {
        //Imprimir el menu
        opt = await inquireMenu();


        switch (opt) {
            case '1':
                // option make task
                const desc = await readInput('Descripción:');
                tasks.taskCreate(desc);

                break;

            case '2':
                tasks.completeList();
                break;

            case '3':

                break;

            case '4':

                break;

            case '5':

                break;

            case '6':

                break;

            case '0':



        }


        // Aquí guardo el data.json       
        saveDB(tasks.listArr);



        await pause();

    } while (opt !== '0');



    // pausa();
}

main();



