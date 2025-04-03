const { Router } = require('express');
const { check } = require('express-validator');


const { validateFields } = require('../middlewares/validation');
const { validateJWT } = require('../middlewares/validate-jwt');
const { createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory } = require('../controllers/categories.controller');


const { existCategory } = require('../helpers/db-validators');
const { get } = require('mongoose');
const { isAdminRole, haveRole } = require('../middlewares');


const router = Router();


/*
 /localhost:8080/api/categories
*/

//Obtener todas las categorias - publico
router.get('/', getCategories);

//Obtener una categoria por id - publico
router.get('/:id', [
    check('id').custom(existCategory),
    validateFields
], getCategory);


//Crear categoria - privado - cualquier persona con un token valido
router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], createCategory);

//Actualizar - privado - cualquier persona con un token valido
router.put('/:id', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existCategory),
    validateFields
], updateCategory);


//Borrar categoria - Admin - cualquier persona con un token valido
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    // haveRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existCategory),
    validateFields
], deleteCategory);






module.exports = router;
