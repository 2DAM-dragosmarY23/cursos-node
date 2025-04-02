
const { response } = require("express");
const { uploadArchive } = require('../helpers/upload-archive');
const { User } = require('../models');
const { Product } = require('../models');

const loadArchive = async (req, res = response) => {

    //Validar si hay archivos en la petición
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archive) {
        res.status(400).json({ msg: 'No hay archivos que subir' });
        return;
    }

    try {

        // const name = await uploadArchive(req.files, ['txt', 'md'], 'textos');
        const name = await uploadArchive(req.files, undefined, 'imgs');

        res.json({
            msg: 'Archivo subido correctamente',
            name
        });

    } catch (error) {
        res.status(400).json({
            msg: error
        });
    }


}


const updateImage = async (req, res = response) => {

    const { collection, id } = req.params;

    let model;

    //Validar si la colección es válida
    const collections = ['users', 'products'];
    if (!collections.includes(collection)) {
        return res.status(400).json({
            msg: `La colección ${collection} no es permitida, ${collections}`
        });
    }

    //Validar si el id es válido
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
            msg: `El id ${id} no es un id válido`,
        });
    }

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }

            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }

            break;

        default:
            return res.status(500).json({
                msg: 'No se ha implementado la actualización de imagen para esta colección'
            });

        //     break;
    }



    const name = await uploadArchive(req.files, undefined, collection);
    model.img = name;

    await model.save();




    res.json({
        msg: 'updateImage',
        collection,
        id
    });
}






module.exports = {
    loadArchive,
    updateImage
}