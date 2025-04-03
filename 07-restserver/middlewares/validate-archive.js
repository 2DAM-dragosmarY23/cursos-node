const { response } = require("express");


const validateArchiveUp = (req, res = response, next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archive) {
        res.status(400).json({ msg: 'No hay archivos que subir - validateArchiveUp' });
        return;
    }

    next();
}




module.exports = {
    validateArchiveUp
}