
require('colors');
const clear = require('clear');


const mostrarMenu = () => {

    return new Promise(resolve => {
        clear();

        console.log('============================='.magenta);
        console.log('   Seleccione una opción:'.cyan);
        console.log('=============================\n'.magenta);

        console.log(`${'1.'.cyan} Crear una tarea`);
        console.log(`${'2.'.cyan} Listar tareas`);
        console.log(`${'3.'.cyan} Listar tareas completadas`);
        console.log(`${'4.'.cyan} Listar tareas pendientes`);
        console.log(`${'5.'.cyan} Completar tarea(s)`);
        console.log(`${'6.'.cyan} Borrar una tarea`);
        console.log(`${'7.'.cyan} Salir \n`);


        const readlne = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readlne.question('Seleccione una opción: \n'.magenta, (opt) => {
            readlne.close();
            resolve(opt);

        })
    })


}

const pausa = () => {

    return new Promise(resolve => {
        const readlne = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readlne.question(`Presione ${'ENTER'.cyan} ${'para continuar:'.magenta} \n`.magenta, (opt) => {
            readlne.close();
            resolve();

        })


    })

}

module.exports = {
    mostrarMenu,
    pausa
}


