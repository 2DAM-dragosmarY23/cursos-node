const { response } = require('express');


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

const userPut = (req, res = response) => {

    const id = req.params.id;

    res.status(400).json({
        msg: 'put API - userPut',
        id
    });
}

const userPost = (req, res = response) => {

    const { name, age } = req.body;


    res.status(201).json({
        msg: 'post API - userPost',
        name,
        age
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