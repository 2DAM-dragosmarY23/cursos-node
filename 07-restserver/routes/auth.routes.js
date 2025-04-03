const { Router } = require('express');
const { check } = require('express-validator');


const { validateFields } = require('../middlewares/validation');

const { login, googleSignIn } = require('../controllers/auth.controller');

const router = Router();

//Obtener usuarios
router.post('/login',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validateFields
], login);


router.post('/google',[
    check('id_token', 'Token de google es necesario').notEmpty(),
    validateFields
], googleSignIn);






module.exports = router;
