
const clear = require('clear');
clear();
const { crearArchivo } = require('./helpers/multiplicar');
const argv = require('./config/yargs');
// const colors = require('colors');


    
    
    
    crearArchivo(argv.n, argv.l, argv.h)
    .then(nombreArchivo => console.log(nombreArchivo.rainbow, 'creado'))
    .catch(err => console.log(err));
    
    
    
    
    // console.log('yargs', argv);
    
    // console.log(argv);

// const [, , arg3 = 'numero=4'] = process.argv;
// const [, numero = 4] = arg3.split('=')
// console.log(numero);




// const numero = 4;





