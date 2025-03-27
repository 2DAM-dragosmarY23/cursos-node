const { Router } = require('express');
const { check } = require('express-validator');

// const { validateFields } = require('../middlewares/validation');
// const { validateJWT } = require('../middlewares/validate-jwt');
// const { isAdminRole, haveRole } = require('../middlewares/validate-roles');
const {
    validateFields, 
    validateJWT, 
    haveRole,
    isAdminRole
} = require('../middlewares')

const { isValidRole, emailExists, existsUserId } = require('../helpers/db-validators');

const { userGet,
    userDelete,
    userPatch,
    userPost,
    userPut } = require('../controllers/user.controller');

const router = Router();

//Obtener usuarios
router.get('/', userGet);



//Actualizar usuario
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existsUserId),
    check('role').custom(isValidRole),
    validateFields
], userPut);


//Crear usuario
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener más de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailExists),
    // check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isValidRole),
    validateFields
], userPost);


//Borrar usuario
router.delete('/:id',[
    validateJWT,
    // isAdminRole,
    haveRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existsUserId),
    validateFields
], userDelete);


//Actualizar usuario
router.patch('/', userPatch);









module.exports = router;