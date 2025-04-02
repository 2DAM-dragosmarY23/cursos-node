const { Router } = require('express');
const { check } = require('express-validator');


const { validateFields } = require('../middlewares/validation');
const { loadArchive, updateImage } = require('../controllers/uploads.controller');
const { validCollections } = require('../helpers/db-validators');


const router = Router();


router.post('/', loadArchive);

router.put('/:collection/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('collection').custom(c => validCollections(c, ['users', 'products'])),
    validateFields
], updateImage);





module.exports = router;
