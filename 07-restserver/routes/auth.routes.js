const { Router } = require('express');
const { check } = require('express-validator');


const { login } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validation');


const router = Router();

//Obtener usuarios
router.post('/login',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validateFields
], login);






module.exports = router;
