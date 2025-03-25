const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validation');
const { isValidRole, emailExists } = require('../helpers/db-validators');

const { userGet, 
        userDelete, 
        userPatch, 
        userPost, 
        userPut } = require('../controllers/user.controller');

const router = Router();

router.get('/', userGet);

router.put('/:id', userPut);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener más de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailExists),
    // check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isValidRole),
    validateFields
], userPost);

router.delete('/', userDelete);

router.patch('/', userPatch);









module.exports = router;