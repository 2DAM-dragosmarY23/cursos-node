const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const { User, Category, Product } = require('../models');

const collectionsAllowed = [
    'users',
    'categories',
    'roles',
    'products'
];

const searchUsers = async (term = '', res = response) => {
    const isMongoId = ObjectId.isValid(term); // True

    if (isMongoId) {
        const user = await User.findById(term);
        return res.json({
            results: (user) ? [user] : []
        });
    }

    // Expresiones regulares para buscar por nombre o correo
    const regex = new RegExp(term, 'i'); // i = case insensitive

    const user = await User.find({ //Se puede usar .count tambien
        $or: [{ name: regex }, { email: regex }],
        $and: [{ state: true }]
    });

    res.json({
        results: user
    });
}

const searchCategories = async (term = '', res = response) => {
    const isMongoId = ObjectId.isValid(term); // True

    if (isMongoId) {
        const category = await Category.findById(term);
        return res.json({
            results: (category) ? [category] : []
        });
    }

    // Expresiones regulares para buscar por nombre o correo
    const regex = new RegExp(term, 'i'); // i = case insensitive

    const categories = await Category.find({ //Se puede usar .count tambien
        $or: [{ name: regex }],
        $and: [{ state: true }]
    });

    res.json({
        results: categories
    });
}


const searchProducts = async (term = '', res = response) => {
    const isMongoId = ObjectId.isValid(term); // True

    if (isMongoId) {
        const product = await Product.findById(term).populate('category', 'name');
        return res.json({
            results: (product) ? [product] : []
        });
    }

    // Expresiones regulares para buscar por nombre o correo
    const regex = new RegExp(term, 'i'); // i = case insensitive

    const products = await Product.find({ //Se puede usar .count tambien
        $or: [{ name: regex }],
        $and: [{ state: true }]
    })
        .populate('category', 'name');

    res.json({
        results: products
    });
}


const search = (req, res = response) => {

    const { collection, term } = req.params;

    if (!collectionsAllowed.includes(collection)) {
        return res.status(400).json({
            msg: `Las collecciones permitidas son: ${collectionsAllowed}`
        });
    }

    switch (collection) {
        case 'users':
            searchUsers(term, res);
            break;
        case 'categories':
            searchCategories(term, res);
            break;
        case 'products':
            searchProducts(term, res);
            break;
        default:
            return res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            });
    }


}




module.exports = {
    search
};