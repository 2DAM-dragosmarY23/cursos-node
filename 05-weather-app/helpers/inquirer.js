const inquirer = require('inquirer').default;
require('colors');
const clear = require('clear');
// const { validate } = require('uuid');

// Una función que retorna un objeto con las opciones del menú
const questions = [{
    type: 'list',
    name: 'option',
    message: '¿Qué desea hacer?',
    choices: [
        {
            value: 1,
            name: `${'1.'.cyan} Buscar ciudad`

        },
        {
            value: 2,
            name: `${'2.'.cyan} Historial`

        },
        {
            value: 0,
            name: `${'0.'.magenta} Salir`

        }
    ]
}];


// Función que imprime el menú y retorna la opción seleccionada
const inquireMenu = async () => {
    clear();

    console.log('============================='.magenta);
    console.log('   Seleccione una opción:'.cyan);
    console.log('=============================\n'.magenta);

    const { option } = await inquirer.prompt(questions);

    return option;

}

// Función que pausa la ejecución del programa
const pause = async () => {


    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.cyan} ${'para continuar:'.magenta} \n`.magenta
        }
    ];

    console.log('\n');

    await inquirer.prompt(question);


}


// Función que lee la descripción de la tarea
const readInput = async (message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.lenght === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }

    ];

    const { desc } = await inquirer.prompt(question);
    return desc;

}


// Función que lista las tareas a borrar
const listPlaces = async (places = []) => {

    const choices = places.map((place, i) => {

        const idx = `${i + 1}.`.cyan;

        return {
            value: place.id,
            name: `${idx} ${place.name}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.cyan + ' Cancelar'
    });

    const questionsDelete = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar:',
            choices

        }
    ]

    const { id } = await inquirer.prompt(questionsDelete);

    return id;

}

const listWeather = async (weather = []) => {

    const choices = weather.map((weather, i) => {

        const idx = `${i + 1}.`.cyan;

        return {
            value: place.id,
            name: `${idx} ${place.name}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.cyan + ' Cancelar'
    });

    const questionsDelete = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar:',
            choices

        }
    ]

    const { id } = await inquirer.prompt(questionsDelete);

    return id;

}

// Función que confirma la eliminación de una tarea
const confirm = async (message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
return ok;

}

const showListChecklist = async (tasks = []) => {

    const choices = tasks.map((task, i) => {

        const idx = `${i + 1}.`.cyan;

        return {
            value: task.id,
            name: `${idx} ${task.desc}`,
            checked: (task.completed) ? true : false
        }
    });

   

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices

        }
    ]

    const { ids } = await inquirer.prompt(question);

    return ids;

}



module.exports = {
    inquireMenu,
    pause,
    readInput,
    listPlaces,
    confirm,
    showListChecklist
}