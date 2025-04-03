
const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);


const { response } = require("express");
const { uploadArchive } = require('../helpers/upload-archive');
const { User } = require('../models');
const { Product } = require('../models');

const loadArchive = async (req, res = response) => {



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

///Actualizar imagen
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

    //Limpiar imágenes previas
    if (model.img) {
        //Hay que borrar la imagen del servidor
        const pathImg = path.join(__dirname, '../uploads', collection, model.img);
        if (fs.existsSync(pathImg)) {
            //Borrar la imagen dejando la ultima imagen subida
            fs.unlinkSync(pathImg);

        }
    }



    const name = await uploadArchive(req.files, undefined, collection);
    model.img = name;

    await model.save();




    res.json({
        model
    });
}


//Subir imagen a cloudinary
const updateImageCloudinary = async (req, res = response) => {



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

    //Limpiar imágenes previas
    if (model.img) {
        const nameArr = model.img.split('/');
        const name = nameArr[nameArr.length - 1];
        const [ public_id ] = name.split('.');
        cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.archive;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    model.img = secure_url;


    await model.save();


    res.json({
        model
    });
}


//Mostrar imagen (get)
const showImage = async (req, res = response) => {

    const { id, collection } = req.params;

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

    //Limpiar imágenes previas
    if (model.img) {
        //Hay que borrar la imagen del servidor
        const pathImg = path.join(__dirname, '../uploads', collection, model.img);
        if (fs.existsSync(pathImg)) {
            return res.sendFile(pathImg)
        }
    }



    const pathImg = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathImg);




}


module.exports = {
    loadArchive,
    updateImage,
    showImage,
    updateImageCloudinary
}