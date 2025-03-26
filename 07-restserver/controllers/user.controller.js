const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');


const userGet = async (req = request, res = response) => {
    // const { q, name = 'No name', apikey, page = 1, limit } = req.query;

    const query = { state: true };
    const { limit = 5, since = 0 } = req.query;


    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(since))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        users
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



const userPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    //TODO validar contra base de datos
    if (password) {
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const userDB = await User.findByIdAndUpdate(id, rest, { new: true });


    res.status(200).json(userDB);
}



const userDelete = async (req, res = response) => {

    const { id } = req.params;


    //Fisicamente lo borramos
    // const user = await User.findByIdAndDelete(id);

    //Cambiar estado a false para no mostrarlo
    const user = await User.findByIdAndUpdate(id, {state:false});

    res.json({
        user
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