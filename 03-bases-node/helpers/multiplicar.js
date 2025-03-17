const fs = require('fs');
const colors = require('colors');



//OPCION 2

const crearArchivo = async (numero = 5, listar = false, hasta = 10) => {
    
    
    
    try {
        
        
        let salida = '';
        let consola = '';
        
        for (let x = 1; x <= hasta; x++) {
            salida += `${ numero } * ${ x } = ${ numero * x }\n`;
            consola += `${ numero } ${colors.red('*')} ${ x } ${'='.red} ${numero * x}\n`;
            
        }
        
        
        if (listar) {
            console.log(colors.underline('======================='.red.bold));
            console.log('     Tabla del '.rainbow, colors.red(numero));
            console.log(colors.underline('======================='.red.bold));
            
            console.log(consola);
        }
        
        fs.writeFileSync(`./salida/tabla-${numero}.txt`, salida);
        
        return (`tabla-${numero}.txt`);
        
    } catch (err) {
        throw err;
    }
    
};




module.exports = { crearArchivo };


//OPCION 1
// const crearArchivo = (numero = 5) => {

//     const promesa = new Promise((resolve, reject) => {

//         console.log('=======================');
//         console.log(`     Tabla del `, numero);
//         console.log('=======================\n');

//         let salida = '';

//         for (let x = 1; x < 11; x++) {
//             salida += `${numero} * ${x} = ${numero * x}\n`;
//         }
//         console.log(salida);


//         fs.writeFileSync(`tabla-${numero}.txt`, salida);

//         resolve(`tabla-${numero}.txt`);


//     });

//     return promesa;

// }



