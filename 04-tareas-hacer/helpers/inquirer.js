const inquirer = require('inquirer').default;
require('colors');
const clear = require('clear');
const { validate } = require('uuid');

const questions = [{
    type: 'list',
    name: 'option',
    message: '¿Qué desea hacer?',
    choices: [
        {
            value: '1',
            name: `${'1.'.cyan} Crear tarea`

        },
        {
            value: '2',
            name: `${'2.'.cyan} Listar tareas`

        },
        {
            value: '3',
            name: `${'3.'.cyan} Listar tareas completadas`

        },
        {
            value: '4',
            name: `${'4.'.cyan} Listar tareas pendientes`

        },
        {
            value: '5',
            name: `${'5.'.cyan} Completar tarea(s)`

        },
        {
            value: '6',
            name: `${'6.'.cyan} Borrar una tarea`

        },
        {
            value: '0',
            name: `${'0.'.magenta} Salir`

        }
    ]
}];


const inquireMenu = async () => {
    clear();

    console.log('============================='.magenta);
    console.log('   Seleccione una opción:'.cyan);
    console.log('=============================\n'.magenta);

    const { option } = await inquirer.prompt(questions);

    return option;




}


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

    const {desc} = await inquirer.prompt(question);
    return desc;

}



module.exports = {
    inquireMenu,
    pause,
    readInput
}

