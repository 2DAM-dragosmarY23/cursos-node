const argv = require('yargs')
    .option('n', {
        alias: 'numero',
        type: 'number',
        demandOption: true,
        describe: 'Es la base de la tabla de multiplicar'
    })
    .option('l', {
        alias: 'listar',
        type: 'boolean',
        demandOption: true,
        default: false,
        describe: 'Muestra la tabla en consola'
    })
    .option('h', {
        alias: 'hasta',
        type: 'number',
        default: 10,
        describe: 'Es hasta qué numero hay que multiplicar'
    })
    .check((argv, options) => {

        if (isNaN(argv.n)) {
            throw 'La base debe de ser un numero';
        }

        if (isNaN(argv.h)) {
            throw 'El límite debe ser un número'
        }
        return true;

    })
    .argv;


module.exports = argv;