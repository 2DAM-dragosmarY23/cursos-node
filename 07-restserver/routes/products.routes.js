const { Router } = require('express');
const { check } = require('express-validator');


const { validateFields } = require('../middlewares/validation');
const { validateJWT } = require('../middlewares/validate-jwt');


const { isAdminRole, haveRole } = require('../middlewares');

const { createProduct, 
        getProducts, 
        getProduct, 
        updateProduct, 
        deleteProduct } = require('../controllers/products.controller');

const { existProduct, existCategory } = require('../helpers/db-validators');

const router = Router();

/*
 /localhost:8080/api/products
*/

//Obtener todos los productos - publico
router.get('/', getProducts);


//Obtener un producto por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existProduct),
    validateFields
], getProduct);



//Crear Producto - privado - cualquier persona con un token valido
router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('category', 'No es un id de Mongo válido').isMongoId(),
    check('category').custom(existCategory),
    validateFields
], createProduct);


//Actualizar - privado - cualquier persona con un token valido
router.put('/:id', [
    validateJWT,
    // check('category', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existProduct),
    validateFields
], updateProduct);

//Borrar producto - Admin - cualquier persona con un token valido
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    // haveRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existProduct),
    validateFields
], deleteProduct);






module.exports = router;
