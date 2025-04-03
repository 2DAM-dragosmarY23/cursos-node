const { Router } = require('express');
const { check } = require('express-validator');


const { validateFields } = require('../middlewares/validation');
const { loadArchive, updateImage, showImage, updateImageCloudinary } = require('../controllers/uploads.controller');
const { validCollections } = require('../helpers/db-validators');
const { validateArchiveUp } = require('../middlewares');


const router = Router();

/// Subir archivos
router.post('/', loadArchive);

// Subir archivos a una colección
router.put('/:collection/:id', [
    validateArchiveUp,
    check('id', 'No es un ID valido').isMongoId(),
    check('collection').custom(c => validCollections(c, ['users', 'products'])),
    validateFields
], updateImageCloudinary);
// ], updateImage);

// Mostrar imagen
router.get('/:collection/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('collection').custom(c => validCollections(c, ['users', 'products'])),
    validateFields
], showImage);





module.exports = router;
