require('colors');
const clear = require('clear');
const inquirer = require('inquirer');
const {
    inquireMenu,
    pause,
    readInput,
    listTaskDelete,
    confirm,
    showListChecklist
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
                tasks.listPendingCompleted(true);
                break;

            case '4':
                tasks.listPendingCompleted(false);
                break;

            case '5':
                const ids = await showListChecklist(tasks.listArr);
                tasks.toggleCompleted(ids);
                
                break;

            case '6':
                const id = await listTaskDelete(tasks.listArr);
                if (id !== '0') {
                    const ok = await confirm('¿Está seguro de que quiere borrarlo?');
                    if (ok) {
                        tasks.deleteTask(id);
                        console.log('Tarea borrada');

                    }
                    // TODO: preguntar si está seguro

                    console.log({ ok });
                }


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



