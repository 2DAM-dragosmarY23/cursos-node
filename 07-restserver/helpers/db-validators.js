const Role = require('../models/role');
const User = require('../models/user');
const Category = require('../models/category');
const { Product } = require('../models');


const isValidRole = async (role = '') => {
    const existRole = await Role.findOne({ role });
    if (!existRole) {
        throw new Error(`El rol ${role} no esta registrado en la BD`);
    }
}


const emailExists = async (email = '') => {
    //Verificar si el correo existe
    const emailExists2 = await User.findOne({ email });
    if (emailExists2) {
        throw new Error(`El correo: ${email} ya está registrado`);
    }
}



const existsUserId = async (id) => {

    //Verificar si el usuario existe
    const existsUser = await User.findById(id);
    if (!existsUser) {
        throw new Error(`El id: ${id} no existe`);
    }

}

const existCategory = async (id) => {
    console.log("Verificando categoría con ID:", id); // Agrega este log para depurar
    const existsCategory = await Category.findById(id);
    if (!existsCategory) {
        throw new Error(`La categoria con el id: ${id} no existe`);
    }
};

const existProduct = async (id) => {
    //Verificar si el producto existe
    const existsProduct = await Product.findById(id);
    if (!existsProduct) {
        throw new Error(`El producto con el id: ${id} no existe`);
    }

}

// Validar colecciones permitidas
const validCollections = (collection = '', collections = []) => {
    const included = collections.includes(collection);
    if (!included) {
        throw new Error(`La colección ${collection} no es permitida, ${collections}`);
    }
    return true;
}


module.exports = { isValidRole, 
    emailExists, 
    existsUserId, 
    existCategory, 
    existProduct,
    validCollections
};


