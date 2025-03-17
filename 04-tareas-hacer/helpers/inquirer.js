const inquirer = require('inquirer').default;
require('colors');
const clear = require('clear');

const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: ['opt1', 'opt2', 'opt3']
}];


const inquireMenu = async() => {
    clear();

    console.log('============================='.magenta);
    console.log('   Seleccione una opción:'.cyan);
    console.log('=============================\n'.magenta);

    const opt = await inquirer.prompt(preguntas);

    return opt;




}



module.exports = {
    inquireMenu
}

