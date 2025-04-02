
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadArchive = (files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {


    return new Promise((resolve, reject) => {


        const { archive } = files;
        const cutName = archive.name.split('.'); //separar el nombre del archivo por el punto
        const extension = cutName[cutName.length - 1]; //obtener la extensión del archivo

        //Validar la extension
        if (!validExtensions.includes(extension)) {
            return reject(`La extensión ${extension} no es permitida, ${validExtensions}`)
        }

        const finalName = uuidv4() + '.' + extension;
        
        // __dirname es la ruta absoluta del directorio donde se encuentra el archivo actual
        const uploadPath = path.join(__dirname, '../uploads/', folder, finalName);

        // mv es un método de fileUpload que mueve el archivo a la ruta especificada
        archive.mv(uploadPath, function (err) {
            if (err) {
                return reject(err);
            }
            resolve(finalName);
        });




    });

}



module.exports = {
    uploadArchive
}