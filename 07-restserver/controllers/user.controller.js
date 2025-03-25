const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { emailExists } = require('../helpers/db-validators');


const userGet = (req = request, res = response) => {

    const { q, name = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - userGet',
        q,
        name,
        apikey,
        page,
        limit
    });
}


const userPost = async (req, res = response) => {



    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //Guardar en BD
    await user.save();


    res.status(201).json({
        user
    });
}



const userPut = (req, res = response) => {

    const id = req.params.id;

    res.status(400).json({
        msg: 'put API - userPut',
        id
    });
}



const userDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - userDelete'
    });
}


const userPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - userPatch'
    });
}






module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
}